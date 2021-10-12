import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from './Components/Footer';
import InputForm from './Components/InputForm';

function App() {
  return (
    <div className="App">
       <header>
         <h1>Trivia</h1>
       </header>
       <Router>
          <Route>
            <InputForm />
          </Route>
       </Router>
       <Footer/>
    </div>
  );
}

export default App;
