import React, { useState, useEffect } from 'react';
import { addUser, getUsers, deleteUser, toggleStar } from './api';
import UserList from './view/UserList';
import SearchBar from './view/SearchBar';
import './App.css';

function App() {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data);
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleAddUser = async () => {
        if (username) {
            const normalizedUsername = username.toLowerCase();
            
            const userExists = users.some(user => user.username.toLowerCase() === normalizedUsername);
            if (userExists) {
                alert("Usuário já existe.");
                setUsername('');
                return;
            }
            try {
                const response = await addUser(username);
                setUsers([...users, response.data]);
                setUsername('');
            } catch (error) {
                console.error("Erro ao adicionar usuário:", error);
                alert(error.response?.data?.error || "Erro ao adicionar o usuário.");
            }
        }
    };

    const handleDeleteUser = async (username) => {
        try {
            await deleteUser(username);
            setUsers(users.filter(user => user.username !== username));
        } catch (error) {
            console.error("Erro ao excluir o usuário:", error);
        }
    };

    const handleToggleFavorite = async (username) => {
        try {
            await toggleStar(username);
            setUsers(users.map(user =>
                user.username === username ? { ...user, favorite: true } : { ...user, favorite: false }
            ));
        } catch (error) {
            console.error("Erro ao favoritar o usuário:", error);
        }
    };

    const hasUsers = users.length > 0;

    return (
        <div className="app">
            <SearchBar 
                username={username} 
                onUsernameChange={setUsername} 
                onAddUser={handleAddUser} 
                users={users} 
                setUsers={setUsers}
                hasUsers={hasUsers}
            />

            <UserList
                users={users}
                onDeleteUser={handleDeleteUser}
                onFavoriteUser={handleToggleFavorite}
            />
        </div>
    );
}

export default App;
