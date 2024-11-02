import React from 'react'; 
 
function UserCard({ user, onDelete, onToggleStar }) { 
    return ( 
        <div className="user-card"> 
            <img src={user.avatar} alt={`${user.name} avatar`} /> 
            <h3>{user.name}</h3> 
            <p>@{user.username}</p> 
            <a href={user.url} target="_blank" rel="noopener noreferrer">GitHub Profile</a> 
            <button onClick={() => onToggleStar(user.username)}> 
                {user.starred ? '⭐️' : '☆'} 
            </button> 
            <button onClick={() => onDelete(user.username)}>Remover</button> 
        </div> 
    ); 
} 
 
export default UserCard;