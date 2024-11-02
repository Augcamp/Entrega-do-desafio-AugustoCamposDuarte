import React, { useState, useEffect } from 'react'; 
import { getUsers, deleteUser, toggleStar } from '../api'; 
import UserCard from './UserCard'; 
 
function UserList() { 
    const [users, setUsers] = useState([]); 
 
    useEffect(() => { 
        fetchUsers(); 
    }, []); 
 
    const fetchUsers = async () => { 
        const response = await getUsers(); 
        setUsers(response.data); 
    }; 
 
    const handleDelete = async (username) => { 
        await deleteUser(username); 
        fetchUsers(); 
    }; 
 
    const handleToggleStar = async (username) => { 
        await toggleStar(username); 
        fetchUsers(); 
    }; 
 
    return ( 
        <div className="user-list"> 
            {users.map(user => ( 
                <UserCard key={user.username} user={user} onDelete={handleDelete} onToggleStar={handleToggleStar} /> 
            ))} 
        </div> 
    ); 
} 
 
export default UserList;