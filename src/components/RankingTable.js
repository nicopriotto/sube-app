"use client";

import '../styles/ranking.css';
import { useState } from 'react';
import { Reorder } from 'framer-motion';
import UserRow from './UserRow';
import { sortUsers } from '../utils/sortUsers';

function RankingTable() {
    const [users, setUsers] = useState(
        sortUsers([
            { id: 1, name: "rome", points: 0 },
            { id: 2, name: "nico", points: 0 },
            { id: 3, name: "pepe", points: 0 }
        ])
    );

    const [lastUpdate, setLastUpdate] = useState({ id: null, delta: 0 });

    function updatePoints(id, delta) {
        setLastUpdate({ id, delta });
        setUsers(prevUsers =>
            sortUsers(
                prevUsers.map(user =>
                    user.id === id
                        ? { ...user, points: Math.max(0, user.points + delta) }
                        : user
                )
            ));

        setTimeout(() => setLastUpdate({ id: null, delta: 0 }), 500);
    }

    return (
        <div className="rankingTable">
            <Reorder.Group axis="y" values={users} onReorder={setUsers}>
                {users.map(user => {
                    let rowClass = "userRow";
                    if (user.id === lastUpdate.id) {
                        rowClass += lastUpdate.delta > 0 ? " updated-up" : " updated-down";
                    }

                    return (
                        <Reorder.Item
                            key={user.id}
                            value={user}
                            initial={false}
                            layout
                            whileDrag={{ scale: 1.03 }}
                        >
                            <UserRow
                                username={user.name}
                                points={user.points}
                                updatePoints={(delta) => updatePoints(user.id, delta)}
                                className={rowClass}
                            />
                        </Reorder.Item>
                    );
                })}
            </Reorder.Group>
        </div>
    );
}

export default RankingTable;
