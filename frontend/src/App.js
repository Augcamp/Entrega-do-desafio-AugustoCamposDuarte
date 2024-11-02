import React, { useState, useEffect } from 'react';
import { addUser, getUsers, deleteUser, toggleStar } from './api';
import UserList from './components/UserList';
import './App.css';

function App() {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    const [isSorted, setIsSorted] = useState(false); // Estado para controlar a ordenação

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
            try {
                const response = await addUser(username);
                console.log("Usuário adicionado:", response.data);
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
        <div className="app">
          <h1>Favoritos do GitHub</h1>

          <div className="input-container">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="GitHub username"
              onKeyPress={(e) => { 
                if (e.key === 'Enter') {
                  handleAddUser();
                }
            }}
            />
            <button onClick={handleAddUser}>Adicionar</button>
          </div>

          <button onClick={toggleSort}>
              {isSorted ? "Remover Ordenação" : "Ordenar A-Z"}
          </button>

          <UserList
            users={users}
            onDeleteUser={handleDeleteUser}
            onFavoriteUser={handleToggleFavorite}
          />
        </div>
      );
}

export default App;
