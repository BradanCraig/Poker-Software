import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css'; // Custom styling for reset password page

function Home(){
    const [gameStatus, setGame] = useState('No Active Games');
    const [activeState, setGameState] = useState('Loading')

    useEffect(() => {
        async function fetchGameStatus() {
        try {
            const res = await fetch("/api/game-status", { credentials: "include" });
            const data = await res.json();
            setGameState(data.status); 
            // data.status could be: "none", "joined", or "hosting"
        } catch (err) {
            console.error(err);
            setGameState("none");
        }
    }

    fetchGameStatus();
  }, []);

    return (
        <div className='home-container'>
            <div className='header'>
                <p className='active-game'>{gameStatus}</p>
            </div>
        
            <div className='options'>
                <button>Join Game</button>
                <button>Start Game</button>
            </div>
        </div>
    )
}

export default Home