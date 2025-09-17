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

export async function removeSubscription(rankingSubscriptionId) {
    return NotificationPersistence.removeSubscription(rankingSubscriptionId);
}

async function webpushSend(subscription, title, body, url, rankingSubscriptionId) {
    try {
        console.log('webpush send ', subscription, title, body, url);
        await webpush.sendNotification(
            subscription,
            JSON.stringify({
                title: title,
                body: body,
                icon: '/icon.png',
                url: url,
            })
        );
        return { success: true };
    } catch (error) {
        console.error('Error sending push notification:', error);
        if (error.statusCode === 410 || error.statusCode === 404) {
            console.log('Deleting expired/unsubscribed push subscription:', rankingSubscriptionId);
            await removeSubscription(rankingSubscriptionId);
        }
        return { success: false, error: 'Failed to send notification' };
    }
}

export async function sendRankingNotifications(rankingId, title, body, url) {
    NotificationPersistence.getRankingSubscriptions(rankingId).then(subscriptions => {
        if (subscriptions) {
            subscriptions.forEach(subscription => {
                webpushSend(subscription.subscription, title, body, url, subscription.ranking_subscription_id);
            })
        }
    });
}