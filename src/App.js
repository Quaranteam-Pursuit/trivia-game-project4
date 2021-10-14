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
  const [ gameSaved, setGameSaved ] = useState(false);
  const [ savedQuestions, setSavedQuestions ] = useState([]);
  const [ loadingGame, setLoadingGame ] = useState(false);


  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/">
            <h1>Quarantine Pursuit</h1>
          </Link>
        </header>
        <main>
          <Link to='/SavedGames'>Saved Games</Link>
          <Route path="/savedgames">
            <SavedGames
              setSavedQuestions={setSavedQuestions}
              setLoadingGame={setLoadingGame}
              setStartNewGame={setStartNewGame}
              savedQuestions={savedQuestions}
            />
          </Route>
          <Route exact path='/'>
              {
                startNewGame && (loadingGame === false) ?
                  <InputForm 
                    setQuestionArray={setQuestionArray}
                    setStartNewGame={setStartNewGame}
                    setGameSaved={setGameSaved}
                  /> :
                  <TriviaGame 
                    gameSaved={gameSaved}
                    questionArray={loadingGame ? savedQuestions : questionArray}
                    setGameSaved={setGameSaved}
                  />
              }
          </Route>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;