import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css'; // Custom styling for reset password page

function Profile(){

    const AddFriend = () => {

    }
    

        return(
            <div className='profile-container'>
                <button onClick={AddFriend}>Add Friend</button>
                
            </div>
        )
}

export default Profile