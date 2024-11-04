import React from 'react';
import '../components/UserCard.css';
import githubIcon from '../assets/icons/github.svg';
import trashIcon from '../assets/icons/trash.svg';
import starIcon from '../assets/icons/star.svg';
import starFilledIcon from '../assets/icons/star-filled.svg';

function UserCard({ user, onDelete, onFavorite }) {
    return (
        <div className="user-card">
            <div className="card-info">
                <img 
                    src={user.avatar} 
                    alt={`${user.name || user.username}`} 
                />
                <h3>{user.name || user.username}</h3>
                <p>{user.username}</p>
        </div>

            <div className="buttons">
                <a href={user.url} target="_blank" rel="noopener noreferrer">
                    <img src={githubIcon} alt="GitHub" className="icons" />
                </a>
                <img 
                    src={trashIcon} 
                    alt="Delete" 
                    className="icons" 
                    onClick={() => onDelete(user.username)} />
                <img
                    src={user.favorite ? starFilledIcon : starIcon}
                    alt="Favorite"
                    className="icons"
                    onClick={() => onFavorite(user.username)}
                />
            </div>
        </div>
    );
}

export default UserCard;
