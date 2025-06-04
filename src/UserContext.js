// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { WebSocketProvider } from './components/socket';
import { Navigate } from 'react-router-dom';
const UserContext = createContext();

const UserProvider = ({ children }) => {
    let data = {
        "id": 16,
        "username": "wdd",
        "email": "adasdadada@gmail.com",
        "date_joined": "2025-04-23T15:35:23.395910",
        "third_party": false,
        "profile_picture": "http://127.0.0.1:8080/media/icons/nonpp.png",
        "is_active": true,
        "bio": null,
        "dialogues": [
            {
                "id": 15,
                "username": "user1",
                "pp": "http://127.0.0.1:8080/media/icons/nonpp.png",
                "spam": false
            }
        ],
        "messages": [
            {
                "id": 11,
                "text": "dfgdfgdf",
                "sender": 16,
                "receiver": 15,
                "date": "2025-05-28T22:46:59.815655"
            },
            {
                "id": 12,
                "text": "dfgdfgdf",
                "sender": 15,
                "receiver": 16,
                "date": "2025-05-28T22:46:59.815655"
            }
        ],
        "notifications": [],
        "tags": [],
        "subscription": {
            "started_at": "2025-05-28T22:46:21.477963",
            "status": "active",
            "canceled_at": null,
            "cancel_at": null,
            "ended_at": null,
            "cancel_at_period_end": false,
            "promocode_used": true
        }
    }
    const [user, setUser] = useState(data);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <WebSocketProvider>
                <Navbar />
                {user.subscription.status !== "active" && (window.location.pathname === "/profile" || window.location.pathname === "/chats") ? <Navigate to="/settings" /> : children}
            </WebSocketProvider>
        </UserContext.Provider>
    );
};
export { UserContext, UserProvider };
