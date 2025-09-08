'use server';
import {cookies} from "next/headers";


export async function getJoinedToken() {
    return (await cookies()).get("joinToken")?.value;
}