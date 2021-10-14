import firebase from '../firebase.js';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        setSavedQuestions(selectedGameArray[0].questions)
        console.log(selectedGameArray[0].questions);
        setLoadingGame(true);
        setStartNewGame(false);
    }
    
    return(
        <>
            <ul>
                {
                    showGames.map((individualGame, index)=>{
                    return(
                        <>
                            <li 
                                id={individualGame.key}>
                                <button
                                    key={index}
                                    onClick={() =>{
                                        handleFilter(individualGame.key);
                                    }}
                                >
                                    Savedgame :{individualGame.key}
                                </button>
                            </li> 
                        </>
                    )
                    })
                }
            </ul>
            <Link exact to="/">
                <p>Home</p>
            </Link>
        </>
    )
}

export default SavedGames;


// we need to pass the setquestions array when the button is clicked. 
