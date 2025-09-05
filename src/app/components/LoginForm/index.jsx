"use client"
import {useFormStatus} from "react-dom";
export default function LoginForm({title, usernameTitle, passwordTitle, handleSubmit}) {
    const {loading} = useFormStatus();
    return (
        <div className="app">
            <div className="app-form-background">
                <h2>{title}</h2>

                <form className="app-form" action={handleSubmit}>
                    <div className="app-form-group">
                        <label htmlFor="rankingName">{usernameTitle}</label>
                        <input
                            name="username"
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="app-form-group">
                        <label htmlFor="rankingPassword">{passwordTitle}</label>
                        <input
                            name="password"
                            id="password"
                            placeholder="Enter your password..."
                            type="password"
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Ranking"}
                    </button>
                </form>
            </div>
        </div>
    );
}
