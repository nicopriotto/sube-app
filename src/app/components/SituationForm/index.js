'use client'
import "./situation.css"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {MatchService} from "@/services/match-service";
import {RankingService} from "@/services/ranking-service";
import {TeamService} from "@/services/team-service";

function Situation() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [persons, setPersons] = useState([]);
    const [loadingPersons, setLoadingPersons] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPersons() {
            try {
                const users = await TeamService.getRankingTeams(9);
                setPersons(users);
            } catch (err) {
                setError("Failed to load persons");
                console.error(err);
            } finally {
                setLoadingPersons(false);
            }
        }

        fetchPersons();
    }, [])

    async function handleSubmit(formData) {
        try {
            const title = formData.get("title") ;
            const description = formData.get("description") ;
            const person = formData.get("person") ;

            if (!person) {
                setError("Please select a person");
                return;
            }
            await MatchService.createRankingMatch(9, [person], 1, title, description);

            router.push("/");
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
                              persons.map(person =>
                              <option value={person.team_id} key={person.team_id}>{person.team_name}</option>
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
