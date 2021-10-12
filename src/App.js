import StartingPoint from './Components/StartingPoint';
import Footer from './Components/Footer';
import './App.css';
import SavedGames from './Components/SavedGames';

// Hi everyone

function App() {
  return (
    <div className="App">
       <header>
         <h1>Trivia</h1>
       </header>
       <StartingPoint/>
       <SavedGames/>
       <Footer/>
    </div>
  );
}

export default App;
