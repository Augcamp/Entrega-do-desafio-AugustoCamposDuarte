import axios from 'axios'; 
import React, { useState } from 'react'; 
import { addUser } from './api'; 
import UserList from './components/UserList';

 
const API = axios.create({ baseURL: 'http://localhost:3001/userController' }); 


export const getUsers = () => API.get('/'); 
export const deleteUser = (username) => API.delete(`/${username}`); 
export const toggleStar = (username) => API.patch(`/${username}/toggle-star`);

 
function App() { 
    const [username, setUsername] = useState(''); 
 
    const handleAddUser = async () => { 
      if (username) { 
          try { 
              const response = await addUser(username); 
              console.log("Resposta da API:", response);
              if (response && response.data) { 
                  console.log("Usuário adicionado:", response.data); 
                  setUsername(''); 
              } else { 
                  console.error("Resposta inválida da API"); 
              } 
          } catch (error) { 
              console.error("Erro ao adicionar usuário:", error); 
              alert(error.response?.data?.error || "Erro ao adicionar o usuário. Verifique o nome de usuário e tente novamente."); 
          } 
      } 
  }; 
 
    return ( 
        <div className="app"> 
            <h1>Favoritos do GitHub</h1> 
            <input  
                type="text"  
                value={username}  
                onChange={(e) => setUsername(e.target.value)}  
                placeholder="GitHub username"  
            /> 
            <button onClick={handleAddUser}>Adicionar</button> 
            <UserList /> 
        </div> 
    ); 
} 
 
export default App;