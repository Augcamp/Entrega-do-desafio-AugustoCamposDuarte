import React, { useState } from 'react';
import { getUsers } from '../api';
import '../components/SearchBar.css';

function SearchBar({ username, onUsernameChange, onAddUser, users, setUsers, hasUsers }) {
    const [isSorted, setIsSorted] = useState(false);

    const sortUsersAlphabetically = () => {
        const sortedUsers = [...users].sort((a, b) => 
            a.username.localeCompare(b.username)
        );
        setUsers(sortedUsers);
        setIsSorted(true);
    };

    const unsortUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Erro ao restaurar a lista original:", error);
        }
        setIsSorted(false);
    };

    const toggleSort = () => {
        if (isSorted) {
            unsortUsers();
        } else {
            sortUsersAlphabetically();
        }
    };

    return (
        <div className="input-container">
            <h1>PUMA - CODE CHALLENGE</h1>

            <input
                type="text"
                value={username}
                onChange={(e) => onUsernameChange(e.target.value)}
                placeholder="GitHub username"
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        onAddUser();
                    }
                }}
            />
            <button onClick={onAddUser}>Adicionar</button>

            {hasUsers && (
                <button className="sort-button" onClick={toggleSort}>
                    {isSorted ? "Remover Ordenação" : "Ordenar A-Z"}
                </button>
            )}
        </div>
    );
}

export default SearchBar;
