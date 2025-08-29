'use client'

import { RankingService } from "@/services/ranking-service";
import { useState} from "react";
import {useRouter} from "next/navigation";

export default function CreateRankingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(formData) {
        try {
            const rankingName = formData.get("rankingName") ;
            const rankingPassword = formData.get("rankingPassword");
            const rankingDescription = formData.get("rankingDescription");
            const type = formData.get("rankingType") ;
            const endsAt = formData.get("endsAt");
            const endsAtDate = endsAt ? new Date(endsAt) : null;

            const defaultTeamLimit = 10;

            await RankingService.createRanking(
                rankingName,
                rankingPassword,
                type,
                defaultTeamLimit,
                endsAtDate,
                rankingDescription,
            );

            router.push("/");
        } catch (err) {
            console.error("Failed to create ranking", err);
            setError(err.message ?? "Failed to create ranking");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="app">
            <div className="app-form-background">
                <h2>Create new Ranking</h2>

                <form className="app-form" action={handleSubmit}>
                    <div className="app-form-group">
                        <label htmlFor="rankingName">Ranking name</label>
                        <input
                            name="rankingName"
                            id="rankingName"
                            type="text"
                            placeholder="Enter name"
                            required
                        />
                    </div>

                    <div className="app-form-group">
                        <label htmlFor="rankingPassword">Ranking password</label>
                        <input
                            name="rankingPassword"
                            id="rankingPassword"
                            placeholder="Enter password..."
                            type="password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="rankingDescription">Ranking Description</label>
                        <textarea name="rankingDescription" id="rankingDescription" placeholder="Describe the ranking..." rows="4"></textarea>
                    </div>

                    <div className="app-form-group">
                        <label htmlFor="rankingType">Select Ranking Type</label>
                        <select name="rankingType" id="rankingType" required>
                            <option value="">Choose a type</option>
                            {Object.values(RankingService.getRankingTypes()).map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="app-form-group">
                        <label htmlFor="endsAt">Ends At</label>
                        <input name="endsAt" id="endsAt" type="date" />
                    </div>
                    {error && <p className="app-form-error">⚠️ {error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Ranking"}
                    </button>
                </form>
            </div>
        </div>
    );
}
