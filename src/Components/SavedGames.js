import firebase from '../firebase.js';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState } from 'react';

const SavedGames = () => {
    const [ShowGames, setShowGames] = useState([]);
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (snapshot) =>{
        const myData = snapshot.val();
        console.log(myData)
    })
    return(
        <div>
            <p>Response from firebase!</p>
        </div>
    )
}

export default SavedGames;