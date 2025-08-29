'use client'
import {useEffect, useState} from "react";
import {RankingService} from "@/services/ranking-service";
import RankingTable from "@/app/components/RankingTable";
import {useParams} from "next/navigation";
import SituationFeed from "@/app/components/SituationFeed";
import {MatchService} from "@/services/match-service";

export default function RankingPage({params}) {
    const { rankingId } =  useParams();
    const [situations, setSituations] = useState([]);
    const [loadingSituations, setLoadingSituations] = useState(true);
    const [situationsError, setSituationsError] = useState(false);
    const [situationsPage, setSituationsPage] = useState(1)
    const situationsPageSize = 5;

    const [standings, setStandings] = useState([])
    const [standingsError, setStandingsError] = useState(null);
    const [loadingStandings, setLoadingStandings] = useState(true);
    const [standingsPage, setStandingsPage] = useState(1)
    const standingsPageSize = 10;
    useEffect(() => {
        async function fetchSituations() {
            try {
                setSituations(await MatchService.getMatchList(rankingId, situationsPage, situationsPageSize, false));
            } catch (error) {
                setSituationsError(error);
            } finally {
                setLoadingSituations(false);
            }
        }
        async function fetchStandings() {
            try {
                setStandings(await RankingService.getRankingsScore(rankingId, standingsPage, standingsPageSize));
            } catch (error) {
                setStandingsError("Error fetching ranking");
                console.log(error);
            } finally {
                setLoadingStandings(false);
            }
        }
        fetchStandings();
        fetchSituations();
    }, [standingsPage]);
    return (
        <div className="home">
                <div className="ranking-section">
                    { loadingStandings ?
                        <div>Loading...</div>
                        :
                        <RankingTable users={standings}/>
                    }
                </div>
                <div className="situations-section">
                    { loadingSituations ?
                        <div>Loading...</div>
                        :
                        <SituationFeed situations={situations}/>
                    }
                </div>
                {standingsError && <p className="app-form-error">⚠️ {standingsError}</p>}
        </div>
    )
}