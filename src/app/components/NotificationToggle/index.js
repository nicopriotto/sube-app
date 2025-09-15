'use client'
import './notification-toggle.css'
import {useEffect, useState} from "react";
import {urlBase64ToUint8Array} from "@/app/utils/urlUtils";
import * as NotificationService from "@/services/notification/notification-service";
import { Bell } from "lucide-react";


export default function NotificationToggle({ rankingId, rankingUserId }) {
    const [isSupported, setIsSupported] = useState(false);
    const [allowNotifications, setAllowNotifications] = useState(false);

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then(async (registration) => {
                setIsSupported(true);
                const sub = await registration.pushManager.getSubscription();
                setAllowNotifications(!!sub);
            });
        }
    }, []);


    async function subscribeToPush() {
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
            ),
        });
        await NotificationService.subscribeRankingUser(rankingId, rankingUserId, sub.toJSON());
    }

    async function unsubscribeFromPush() {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        await subscription?.unsubscribe();
        await NotificationService.unsubscribeRankingUser(rankingId, rankingUserId);
    }

    async function toggleSubscription() {
        if (allowNotifications) {
            setAllowNotifications(false);
            await unsubscribeFromPush();
        } else {
            setAllowNotifications(true);
            await subscribeToPush();
        }
    }

    if (!isSupported) {
        return null;
    }
    return (
        <button
            className={`notification-button ${allowNotifications ? "active" : ""}`}
            onClick={toggleSubscription}
        >
            {allowNotifications ? (
                <Bell className="bell-icon filled" />
            ) : (
                <Bell className="bell-icon outline" />
            )}
        </button>
    );
}