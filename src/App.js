import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import InputForm from './Components/InputForm';
import TriviaGame from './Components/TriviaGame';
import Footer from './Components/Footer';
import SavedGames from './Components/SavedGames'

function App() {
  const [ startNewGame, setStartNewGame ] = useState(true);
  const [ questionArray, setQuestionArray ] = useState([]);
  // const [startSavedGame, setStartSavedGame] =useState(false)
  const [ savedQuestions, setSavedQuestions ] = useState([]);
  const [ loadingGame, setLoadingGame ] = useState(false);

  console.log(questionArray)
  console.log(savedQuestions)

  return (
    <div className="App">
      <Router>
        <header>
          <h1>Quarantine Pursuit</h1>
        </header>
        <Link to='/SavedGames'>Saved Games</Link>
        <Route path="/savedgames">
          <SavedGames
            setSavedQuestions={setSavedQuestions}
            setLoadingGame={setLoadingGame}
            setStartNewGame={setStartNewGame}
            savedQuestions={savedQuestions}
          />
        </Route>
        <Route  exact path='/'>
          <main>
            {
              startNewGame ?
              <InputForm 
              setQuestionArray={setQuestionArray}
              setStartNewGame={setStartNewGame}

              /> :
              <TriviaGame 
              questionArray={loadingGame ? undefined : questionArray}
              />
            }
          </main>
        </Route>
        <Route path='/savedgame/:gameID'>
            
        </Route>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
