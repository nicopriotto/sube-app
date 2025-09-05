
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import LoginForm from "@/app/components/LoginForm";
import {UserService} from "@/services/user-service";

function createJoinAction(rankingId, redirectTo) {
    return async function join(formData) {
        "use server"
        const username = formData.get("username");
        const password = formData.get("password");

        const id = await UserService.joinRanking(rankingId, username, password);

        if (id === undefined) {
            throw new Error("unexpected error");
        }
        const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
            expiresIn: "31d",
        });

        (await cookies()).set({
            name: "authToken",
            value: token,
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 31,
        });
        redirect(redirectTo);
    }
}


export default async function JoinPage({params, searchParams}) {
    const {rankingId} = await params;
    const redirectTo = (await searchParams).redirect || ("/ranking/" + rankingId);

    return (
        <LoginForm title={"Join Ranking"} usernameTitle={"Ranking username"} handleSubmit={createJoinAction(rankingId, redirectTo)} passwordTitle={"Ranking user password"}/>
    );
}
