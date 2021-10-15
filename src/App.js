import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route,Link } from 'react-router-dom';
import InputForm from './Components/InputForm';
import TriviaGame from './Components/TriviaGame';
import Footer from './Components/Footer';
import SavedGames from './Components/SavedGames'

function App() {
  // All values that are stored within state that determine what interface renders to the page
  const [ startNewGame, setStartNewGame ] = useState(true); // Determines whether the user is starting a new game
  const [ questionArray, setQuestionArray ] = useState([]); // Stores an array of all the questions returned by the API after a search query is sent, one of two variables that populates the trivia game component
  const [ gameSaved, setGameSaved ] = useState(false); // Determines whether the current game is saved
  const [ savedQuestions, setSavedQuestions ] = useState([]); // Stores an array of all the questions returned by the realtime database based on the game selected by the user in the saved games route, one of two variables that populates the trivia game component
  const [ loadingGame, setLoadingGame ] = useState(false); // Determines whether a previous save state will be rendered to the page

  // Handles allowing the user to start a new game by clicking on the link this event is attached to
  const handleReturn = () => {
    setLoadingGame(false);
    setStartNewGame(true);
  }

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Quarantine Pursuit</h1>
          <nav>
            <Link 
              to='/'
              onClick={handleReturn}
            >Home</Link>
            <Link to='/SavedGames'>Saved Games</Link>
            <Link to='/'>Play</Link>
          </nav>
        </header>
        <main>
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
                    // Conditionally populates the triviaGame component with either an array of questions from the API or realtime database depending on whether the loadingGame state value is true
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