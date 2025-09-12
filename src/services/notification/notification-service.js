'use server';

import webpush from 'web-push';
import * as NotificationPersistence from "@/persistence/notification/notification-persistence";

webpush.setVapidDetails(
    'mailto:subeapp22@gmail.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

export async function subscribeRankingUser(rankingId, rankingUserId, subscription) {
    return NotificationPersistence.subscribeRankingUser(rankingId, rankingUserId, subscription);
}

export async function unsubscribeRankingUser(rankingId, rankingUserId) {
    return NotificationPersistence.unsubscribeUser(rankingId, rankingUserId);
}

export async function sendNotification(rankingId, rankingUserId, title, body) {
    const subscription = await NotificationPersistence.getRankingUserSubscription(rankingId, rankingUserId);
    if (!subscription) {
        throw new Error('No subscription available');
    }

    try {
        await webpush.sendNotification(
            subscription,
            JSON.stringify({
                title: title,
                body: body,
                icon: '/icon.png',
            })
        );
        return { success: true };
    } catch (error) {
        console.error('Error sending push notification:', error);
        return { success: false, error: 'Failed to send notification' };
    }
}