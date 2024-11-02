import React from 'react';
import './UserList.css';
import UserCard from './UserCard';

function UserList({ users, onDeleteUser, onFavoriteUser }) {
    return (
        <div className="user-list">
            {users.map(user => (
                <UserCard
                    key={user.username}
                    user={user}
                    onDelete={onDeleteUser}
                    onFavorite={onFavoriteUser}
                />
            ))}
        </div>
    );
}

export default UserList;
