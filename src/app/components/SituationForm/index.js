"use client";
import "./situation.css";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MatchService } from "@/services/match-service";
import { TeamService } from "@/services/team-service";
import { RankingService } from "@/services/ranking-service";

function Situation({ rankingId: rankingIdProp }) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [persons, setPersons] = useState([]);
    const [loadingPersons, setLoadingPersons] = useState(true);
    const [userToTeam, setUserToTeam] = useState({});
    const [error, setError] = useState(null);
    const params = useParams?.() || {};
    const searchParams = useSearchParams?.();

    const effectiveRankingId = useMemo(() => {
        const fromProp = rankingIdProp ? Number(rankingIdProp) : undefined;
        const fromParams = params?.rankingId ? Number(params.rankingId) : undefined;
        const fromQuery = searchParams?.get ? Number(searchParams.get("rankingId")) : undefined;
        return fromProp || fromParams || fromQuery || 9;
    }, [rankingIdProp, params?.rankingId, searchParams]);

    useEffect(() => {
        async function fetchPersons() {
            try {
                const [rankingUsers, teamsWithMembers] = await Promise.all([
                    RankingService.getRankingUsers(effectiveRankingId),
                    TeamService.getRankingTeamsWithMembers(effectiveRankingId),
                ]);
                setPersons(rankingUsers || []);
                
                const mapping = {};
                (teamsWithMembers || []).forEach(team => {
                    const ruTeams = team?.ranking_user_team || [];
                    ruTeams.forEach(entry => {
                        const ru = entry?.ranking_user;
                        if (ru && ru.ranking_user_id) {
                            mapping[ru.ranking_user_id] = team.team_id;
                        }
                    });
                });
                setUserToTeam(mapping);
            } catch (err) {
                setError("Failed to load persons");
                console.error(err);
            } finally {
                setLoadingPersons(false);
            }
        }

        fetchPersons();
    }, [effectiveRankingId])

    async function handleSubmit(formData) {
        try {
            const title = formData.get("title") ;
            const description = formData.get("description") ;
            const rankingUserId = Number(formData.get("person"));

            if (!rankingUserId) {
                setError("Please select a person");
                return;
            }
            const teamId = userToTeam[rankingUserId];
            if (!teamId) {
                setError("Selected user is not part of any team in this ranking");
                return;
            }
            await MatchService.createRankingMatch(effectiveRankingId, [teamId], 1, title, description);
            router.push(`/ranking/${effectiveRankingId}`);
        } catch (err) {
            console.error("Failed to create ranking", err);
            setError(err.message ?? "Failed to create ranking");
        } finally {
            setSubmitting(false);
        }
    }
  return (
    <div className="situation">
      <h2>Propose a New Situation</h2>
      
      <form className="situation-form" action={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Situation Title</label>
          <input name="title" type="text" id="title" placeholder="Enter title" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Detailed Description</label>
          <textarea name="description" id="description" placeholder="Describe the situation..." rows="4"></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="person">Select Person Involved</label>
          <select name="person" id="person">

              {loadingPersons ? <option value="">Loading persons...</option>:
                  (
                      <>
                          <option value="">Choose a person</option>
                          {
                              persons.map(u =>
                              <option value={u.ranking_user_id} key={u.ranking_user_id}>{u.ranking_user_name}</option>
                              )
                          }
                      </>
                  )
              }
          </select>
        </div>

          {error && <p className="app-form-error">⚠️ {error}</p>}

          <button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Situation"}
          </button>
      </form>
    </div>
  )
}

export default Situation
