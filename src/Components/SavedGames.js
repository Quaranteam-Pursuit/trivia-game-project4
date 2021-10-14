import firebase from '../firebase.js';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState,useEffect } from 'react';
// import TriviaGame from './TriviaGame.js';

const SavedGames = (props) => {
    const [showGames, setShowGames] = useState([]);
    const { setLoadingGame, setSavedQuestions, setStartNewGame } = props;

    useEffect(()=>{ 
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        onValue(dbRef, (snapshot) =>{   
            const myData = snapshot.val();
            const arrayOfQuestionsInFirebase = [];
            
            for (let savedGame in myData){
                
                const gamesObject =  {
                    key:savedGame,
                    questions: myData[savedGame]
                }
                arrayOfQuestionsInFirebase.push(gamesObject)
            }
            setShowGames(arrayOfQuestionsInFirebase)
        })
    },[])
// filters the arrayofquestionsfromfiorebase based on the id of the component is clicked. 
    const handleFilter = (savedGameId) => {
        const selectedGameArray = showGames.filter(game => game.key === savedGameId);
        setSavedQuestions(selectedGameArray)
        setLoadingGame(true);
        setStartNewGame(false);
    }
    
    return(
        <ul>
            {
                showGames.map((individualGame)=>{
                return(
                    <>
                    <li key={individualGame.key}>
                        <button onClick={() =>{
                        handleFilter(individualGame.key);
                    }}>Savedgame :{individualGame.key}</button>
                    </li>
                   

                    </>
                   )
                })
            }
        </ul>
    )
}

export default SavedGames;


// we need to pass the setquestions array when the button is clicked. 
