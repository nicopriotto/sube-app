'use client'

import {useActionState} from "react";
import {useFormStatus} from "react-dom";
import * as RankingServiceClient from "@/services/ranking/ranking-service.client";
export default function RankingForm({onSubmit}) {
    const [state, formAction] = useActionState(onSubmit, { error: null });
    const {loading} = useFormStatus();

    return (
        <div className="app">
            <div className="app-form-background">
                <h2>Create new Ranking</h2>

                <form className="app-form" action={formAction}>
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

                    <div className="app-form-group">
                        <label htmlFor="rankingDescription">Ranking Description</label>
                        <textarea name="rankingDescription" id="rankingDescription" placeholder="Describe the ranking..." rows="4"></textarea>
                    </div>

                    <div className="app-form-group">
                        <label htmlFor="rankingType">Select Ranking Type</label>
                        <select name="rankingType" id="rankingType" required>
                            <option value="">Choose a type</option>
                            {Object.values(RankingServiceClient.getRankingTypes()).map((type, index) => (
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
                    {state.error && <p className="app-form-error">⚠️ {state.error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Ranking"}
                    </button>
                </form>
            </div>
        </div>
    );
}
