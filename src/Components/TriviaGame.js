import {  useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import firebase from '../firebase';
import { getDatabase, ref, push } from 'firebase/database'; 

const TriviaGame = props => {
    //creating reference to firebase realtime database
    const database = getDatabase(firebase);
    const dbRef = ref(database);  
    // Pass the array of question objects as a prop from the parent component

    // No.1 - Pass the array of question objects as a prop from the parent component
    const { questionArray, setGameSaved, gameSaved } = props;
    
    // No. 2e - Store one question at a time from the array of questions to render for to the interface for the user to interact with
    const [ currentQuestion, setCurrentQuestion ] = useState({}); 

    // No. 5a - Store a boolean value that determines whether the application validates a selected answer or reveals the next question
    const [ validatingAnswer, setValidatingAnswer ] = useState(false);

    // Store a string value that reflects the most recent selection by the user
    const [ userChoice, setUserChoice ] = useState("");

    // No. 6a - Store a boolean value that determines which icon to render to the interface based on whether the user answered correctly
    const [ answeredCorrectly, setAnsweredCorrectly ] = useState(null); // Will update to be either true, false, or null depending on what point in validation the application is at

    // Store an integer that corresponds to the user's current position in the array of questions
    const [ userPosition, setUserPosition ] = useState(1);

    // Store an integer that corresponds to the length of the questions array
    const [ gameLength ] = useState(questionArray.length); // No. 7b - Store the length of question array to indicate to user the game's length

    // No. 3a - Destructure the current question to access all the data that will change with each question
    const { category, correct_answer, difficulty, incorrect_answers, question } = currentQuestion; // Destructure current question

    // No. 3g - Initialize a namespace object for the component to store the randomly sorted array of answers
    const myComponent = {}

    // No. 2c | No. 3e - Returns a random index based on the array passed into the function as an argument
    const generateRandom = array => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return randomIndex;
    }

    // No. 2d | No. 3f - Removes the value stored at the index specified as an argument from the array that is passed as an argument with it
    const removeIndex = (array, index) => {
        array.splice(index, 1);
        return array;
    }

    // No. 2b - Returns a random question object while also removing it from it's original array to prevent duplicate from being selected
    const selectQuestion = array => {
        const questionIndex = generateRandom(array); //No. 2c - Called
        const currentQuestion = array[questionIndex];
        removeIndex(array, questionIndex); //No. 2d - Called
        return currentQuestion;
    }

    // No. 2a - Sets the current question in state to the randomly selected question that is returned
    const handleCurrentQuestion = array => {

        // The behavior described above will only occur if the array length is greater than zero
        if (array.length !== 0) {
            const currentQuestion = selectQuestion(array); // No. 2b - Called
            setCurrentQuestion(currentQuestion); // No. 2e - Called
        }

    }

    // Receives an array then creates a copy that on average has all the options occupying a different index then before
    const randomizeOrder = array => { // No. 3d
        let initialOrder = array.slice();
        let randomOrder = [];

        // Loops through the length of the initial array and pushes each current index into the new array before removing it from the looping array 
        for (let i = 0; i < initialOrder.length; i++) {
            const currentIndex = generateRandom(array); //No. 3e - Called
            const currentOption = array[currentIndex];
            randomOrder.push(currentOption);
            removeIndex(array, currentIndex); //No. 3f - Called
        }

        return randomOrder;
    }

    // Shuffles the correct answer amongs the incorrect answers and returns a order with randomly assorted values
    const shuffleOptions = (correctAnswer, incorrectAnswers) => { // No. 2b - Pass current the question's answers to shuffleOptions

        // If the array of incorrect answers is undefined this conditional logic won't run, preventing the application from breaking
        if (incorrect_answers !== undefined) {
            const initialOrder = [...incorrectAnswers, correctAnswer];
            const randomOrder = randomizeOrder(initialOrder); // No. 3c - Randomize order of answers
            myComponent.randomizedOrder = randomOrder; //No. 3g - Store answers after being randomized  
        }

    }

    // Increments the value in the userPosition state variable each time the user answers a question regardless of whether its correct
    const incrementPosition = () => { // No. 7c - If user's position is less than the game length...
        const positionIndex = userPosition;

        // Only increment if the user's position in the array is less than the length of the same array
        if (positionIndex < gameLength) {
            setUserPosition(positionIndex + 1); // No. 7d - Update their position in state 
        }
    }
    
    // Immediately call shuffle function to automatically sort the answers once the question array populates with values 
    if (validatingAnswer) { //No. 5a - When question is revealed shuffle the answer's positions
        // Encountered a bug where the answers would be randomly sorted with each button click, now it hides all answer after submitting
        shuffleOptions(correct_answer, incorrect_answers);
    }


    // No. 4b - Sets the user choice state variable to the last selected option
    const handleSelection = event => {
        const currentSelection = event.target.textContent;
        setUserChoice(currentSelection); // No. 4c - Stores user's current selected answer
    }

    // No. 6c - Compares the value of the targeted element with the correct answer value from the question object
    const handleValidation = userChoice => {
        if (userChoice === `${correct_answer}`) { // No. 6d - Compare user's selection with destructured correct answer value
            setAnsweredCorrectly(true);  // No. 6e - Temporarily store whether they answered correctly 

        } 
        if (userChoice !== `${correct_answer}`) { // No. 6d - Compare user's selection with destructured correct answer value
            setAnsweredCorrectly(false); // No. 6e - Temporarily store whether they answered incorrectly
        }
    }
    
        // save the games to firebase only one time and hide the button after the save happened
    const handleGameSave = () => {
        push(dbRef, questionArray);
        setGameSaved(true);   
    }

    const [gameLaunched, setGameLaunched] = useState(false)

    const launchHander = () => {
        setGameLaunched(true)
    }

    const [gameFinished, setGameFinished] = useState(false)

    const endGameHandler = () => {
        if (questionArray.length === 0) {
            setGameFinished(true)
        }
    }

    if (gameLaunched === false) {
        return (
            <div className="launchInterface">
                <p>We found {questionArray.length} questions that match your search!</p>
                <button onClick={launchHander}>Launch game!</button>
            </div>
        )
    }

    if (gameLaunched) {
        return (
            <div className="gameInterface">
                <div className="wrapper">
                    <div className="resultHeader">
                        <div className="questionCategory">
                            <p>{category}</p>
                        </div>
                        <div className="questionDifficulty">
                            <p>{difficulty}</p>
                        </div>
                        <div className="visualFeedback">
                            {
                                answeredCorrectly === null ?
                                    <></> :
                                    answeredCorrectly ?
                                    <FaCheckCircle /> :
                                    <FaTimesCircle />
                            }
                        </div>
                        <div className="currentPosition">
                            <p>Question {userPosition}/{gameLength}</p>
                            <span className="answerHistory"></span>
                        </div>
                        <div className="questionText">
                            <p>{question}</p>
                        </div> 
                        <form className="answerForm">
                            <div className="allAnswers">
                                {
                                    myComponent.randomizedOrder !== undefined ?
                                        // Map through all of the multiple choice answers after they have been randomly order and create an li element for each
                                        myComponent.randomizedOrder.map((value, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="answerContainer"
                                                >

                                                    <input
                                                        type="radio"
                                                        className="answerInput"
                                                        id={index}
                                                        name="answerOption"
                                                        onClick={event => handleSelection(event)}
                                                    >   
                                                    </input>
                                                    <label
                                                        htmlFor={index}
                                                        className="answerLabel"
                                                        tabIndex="0"
                                                    >
                                                        {value}
                                                    </label>
                                                </div>
                                            )
                                        }) :
                                        null
                                }
                            </div>
                        </form>
                        <div>
                            {
                            !gameSaved ?
                            <button onClick={handleGameSave}>Save Game</button> :
                            null
                            }
                            {
                                validatingAnswer 
                                    ? <button 
                                        onClick={() => {
                                            setValidatingAnswer(false);
                                            handleValidation(userChoice);
                                            incrementPosition();
                                            endGameHandler();
                                        }}
                                    >Submit Answer</button> 
                                    : gameFinished
                                    ? <button 
                                    >
                                    Finish game!
                                    </button> 
                                    : <button
                                        // Each time the button is clicked a new question object will be stored into state to access and render its contents to the page 
                                        onClick={() => {
                                            handleCurrentQuestion(questionArray);
                                            setValidatingAnswer(true);
                                            setAnsweredCorrectly(null);
                                        }}
                                    >Reveal Question {userPosition}</button>
                                    
                                    
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TriviaGame;
