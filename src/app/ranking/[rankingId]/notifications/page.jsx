import PushNotificationManager from "@/app/components/PushNotificationManager";
import jwt from "jsonwebtoken";
import {getJoinedToken} from "@/app/utils/tokenUtils";


export default async function NotificationsPage({params}) {
    const {rankingId} = await params;
    const token = await getJoinedToken();

    let rankingUserId;
    try {
        rankingUserId = jwt.verify(token, process.env.JWT_SECRET)?.id;
    } catch {
        //await logoutAction();
        console.log("aura");
    }
    return (
        <PushNotificationManager rankingId={rankingId} rankingUserId={rankingUserId}></PushNotificationManager>
    )
}