'use client'
import {useEffect} from "react";

export default function ServiceWorker() {
    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.register('/sw.js', {
                scope: '/',
                updateViaCache: 'none',
            }).then(() => {
                console.log("SW registered");
            }).catch(err => {
                console.error("SW registration failed:", err);
            });
        }
    }, []);
    return null;
}