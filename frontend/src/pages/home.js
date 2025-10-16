import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css'; // Custom styling for reset password page

function Home(){
    const [gameStatus, setGame] = useState('No Active Games');
    const [activeState, setGameState] = useState('Loading')
    const [pastGames, setPastGames] = useState([])
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





    function PopulateTransactions() {
        try{
            fetch("http://127.0.0.1:5000/get_past_games")
                .then(responce => responce.json())
                .then(data => setPastGames(data))    
        }
        catch(err) {
            console.log(err);
        }

    }
  }, []);

    return (
<div className="transactions-container">
      <h2>Past Transactions</h2>
      {pastGames.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <div className="transactions-list">
          {pastGames.map((tx) => {
            const isPositive = tx.amount >= 0;
            return (
              <div
                key={tx._id}
                className={`transaction-card ${
                  isPositive ? "positive" : "negative"
                }`}
              >
                <div className="transaction-row">
                  <span className="transaction-date">
                    {new Date(tx.date).toLocaleDateString()}
                  </span>
                  <span className="transaction-amount">
                    {isPositive ? "+" : "-"}${Math.abs(tx.amount).toFixed(2)}
                  </span>
                </div>
                <div className="transaction-group">Group: {tx.group}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    )
}

export default Home