'use client'
import {useEffect, useState} from "react";
import {RankingService} from "@/services/ranking-service";
import RankingTable from "@/app/components/RankingTable";
import {useParams} from "next/navigation";
import {MatchService} from "@/services/match-service";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import PaginationBar from "@/app/components/PaginationBar";

export default function RankingWrapper({rankingId, joined, rankingUserName}) {
    const [ranking, setRanking] = useState(null);
    const [loading, setLoading] = useState(true);

    const [situations, setSituations] = useState([]);
    const [loadingSituations, setLoadingSituations] = useState(true);
    const [situationsError, setSituationsError] = useState(false);
    const [situationsPage, setSituationsPage] = useState(1)
    const situationsPageSize = 5;

    const [standings, setStandings] = useState([])
    const [standingsError, setStandingsError] = useState(null);
    const [loadingStandings, setLoadingStandings] = useState(true);
    const [standingsPage, setStandingsPage] = useState(1)
    const standingsPageSize = 20;
    useEffect(() => {
        async function fetchRanking() {
            try {
                setRanking(await RankingService.getRankingConfigurationById(rankingId));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
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
        fetchRanking();
    }, [standingsPage]);
    if (loading) return <LoadingSpinner/>
    return (
        <div className="home">
            <>
                <div className="ranking-section" style={{width: '100%'}}>
                    { (loadingStandings && loadingSituations) ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <RankingTable
                                rankingId={rankingId}
                                title={ranking?.ranking_name}
                                description={ranking?.ranking_description}
                                users={standings}
                                situations={situations}
                                joined={joined}
                                rankingUserName={rankingUserName}
                            />
                        </>
                    )}
                </div>
            </>
            {standingsError && <p className="app-form-error">⚠️ {standingsError}</p>}
        </div>
    )
}
