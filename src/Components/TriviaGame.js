import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaRegCircle } from 'react-icons/fa';

const TriviaGame = props => {
    // Pass the array of question objects as a prop from the parent component
    const { questionArray } = props;
    
    // Store one question at a time from the array of questions to render for to the interface for the user to interact with
    const [ currentQuestion, setCurrentQuestion ] = useState({});

    // Store a boolean value that determines whether the application validates a selected answer or reveals the next question
    const [ validatingAnswer, setValidatingAnswer ] = useState(false);

    // Store a string value that reflects the most recent selection by the user
    const [ userChoice, setUserChoice ] = useState("");

    // Store a boolean value that determines which icon to render to the interface based on whether the user answered correctly
    const [ answeredCorrectly, setAnsweredCorrectly ] = useState(null);

    // Store an integer that corresponds to the user's current position in the array of questions
    const [ userPosition, setUserPosition ] = useState(1);

    // Store an integer that corresponds to the length of the questions array
    const [ gameLength, setGameLength ] = useState(questionArray.length);

    // Destructure the current question to access all the data that will change with each question
    const { category, correct_answer, difficulty, incorrect_answers, question } = currentQuestion;

    // Initialize a namespace object for the component to store the randomly sorted array of answers
    const myComponent = {}

    // Returns a random index based on the array passed into the function as an argument
    const generateRandom = array => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return randomIndex;
    }

    // Removes the value stored at the index specified as an argument from the array that is passed as an argument with it
    const removeIndex = (array, index) => {
        array.splice(index, 1);
        return array;
    }

    // Returns a random question object while also removing it from it's original array to prevent duplicate from being selected
    const selectQuestion = array => {
        const questionIndex = generateRandom(array);
        const currentQuestion = array[questionIndex];
        removeIndex(array, questionIndex);
        return currentQuestion;
    }

    // Sets the current question in state to the randomly selected question that is returned
    const handleCurrentQuestion = array => {

        // The behavior described above will only occur if the array length is greater than zero
        if (array.length !== 0) {
            const currentQuestion = selectQuestion(array);
            setCurrentQuestion(currentQuestion);
        }

    }

    // Receives an array then creates a copy that on average has all the options occupying a different index then before
    const randomizeOrder = array => {
        let initialOrder = array.slice();
        let randomOrder = [];

        // Loops through the length of the initial array and pushes each current index into the new array before removing it from the looping array 
        for (let i = 0; i < initialOrder.length; i++) {
            const currentIndex = generateRandom(array);
            const currentOption = array[currentIndex];
            randomOrder.push(currentOption);
            removeIndex(array, currentIndex);
        }

        return randomOrder;
    }

    // Shuffles the correct answer amongs the incorrect answers and returns a order with randomly assorted values
    const shuffleOptions = (correctAnswer, incorrectAnswers) => {

        // If the array of incorrect answers is undefined this conditional logic won't run, preventing the application from breaking
        if (incorrect_answers !== undefined) {
            const initialOrder = [...incorrectAnswers, correctAnswer];
            const randomOrder = randomizeOrder(initialOrder);
            myComponent.randomizedOrder = randomOrder;   
        }

    }

    // Increments the value in the userPosition state variable each time the user answers a question regardless of whether its correct
    const incrementPosition = () => {
        const positionIndex = userPosition;

        // Only increment if the user's position in the array is less than the length of the same array
        if (positionIndex < gameLength) {
            setUserPosition(positionIndex + 1);
        }

    }
    
    // Immediately call shuffle function to automatically sort the answers once the question array populates with values 
    if (validatingAnswer) {
        // Encountered a bug where the answers would be randomly sorted with each button click, now it hides all answer after submitting
        shuffleOptions(correct_answer, incorrect_answers);
    }

    // Sets the user choice state variable to the last selected option
    const handleSelection = event => {
        const currentSelection = event.target.textContent;
        setUserChoice(currentSelection);
    }

    // Compares the value of the targeted element with the correct answer value from the question object
    const handleValidation = userChoice => {
        if (userChoice === `${correct_answer}`) {
            setAnsweredCorrectly(true);
        } 
        if (userChoice !== `${correct_answer}`) {
            setAnsweredCorrectly(false);
        }
    }
    
    return (
        <div className="gameInterface">
            <div className="wrapper">
                <div className="resultHeader">
                    <div className="questionCategory">
                        <p>{category}</p>
                    </div>
                    <div className="questionDifficulty">
                        <p>Difficulty: {difficulty}</p>
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
                        <p>Question: {userPosition}/{gameLength}</p>
                        <span className="answerHistory"></span>
                    </div>
                </div>
                <div className="questionText">
                    <p>{question}</p>
                </div> 
                <ul>
                    {
                        myComponent.randomizedOrder !== undefined ?
                            // Map through all of the multiple choice answers after they have been randomly order and create an li element for each
                            myComponent.randomizedOrder.map((value, index) => {
                                return (
                                    <li 
                                        key={index}
                                        id={index}
                                        onClick={event => handleSelection(event)}
                                    >   
                                        <span className="iconContainer">
                                            <FaRegCircle />
                                        </span>
                                        {value}
                                    </li>
                                )
                            }) :
                            null
                    }
                </ul>
                <div>
                    <button className="saveButton">Save Game</button>
                    {
                        validatingAnswer ?
                            <button
                                className="submitButton"
                                onClick={() => {
                                    setValidatingAnswer(false);
                                    handleValidation(userChoice);
                                    incrementPosition();
                                }}
                            >Submit Answer</button> :
                            <button
                                // Each time the button is clicked a new question object will be stored into state to access and render its contents to the page 
                                onClick={() => {
                                    handleCurrentQuestion(questionArray);
                                    setValidatingAnswer(true);
                                    setAnsweredCorrectly(null);
                                }}
                            >Reveal Question</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default TriviaGame;