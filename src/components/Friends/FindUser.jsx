import { useState, useEffect } from "react";
import * as usersAPI from '../../utilities/users-api'
import '../../Pages/FriendsPage/index.css'

function FindUser({sendFriendRequest}) {
    const [query, setQuery] = useState('')
    const [foundUsers, setFoundUsers] = useState([])
    
    async function _handleChange(event){
        setQuery(event.target.value)
        event.preventDefault();
        const searchedUsers = await usersAPI.searchUsers(query)
        setFoundUsers(searchedUsers)
    }

    async function addFriendRequest(friendID){
        sendFriendRequest(friendID)
        setQuery('');
        setFoundUsers([])
    }

    return(
        <>
        <form className="friends-container">
        <input 
            type="search" 
            placeholder="Search and add other users to chat with them"
            onChange={_handleChange}></input>
        </form>

        {foundUsers.map((user, index) => 
        <div key = {index}>
            <p>{user.name}</p>
            <button 
                key={user._id}
                onClick={(event) => addFriendRequest(user._id)} 
                value={user._id}>Send Friend Request</button>
        </div>
        )}
        </>
    )
}

export default FindUser


