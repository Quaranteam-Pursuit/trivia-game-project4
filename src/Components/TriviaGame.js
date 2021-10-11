import { useState } from 'react';

const TriviaGame = props => {
    // Pass the array of question objects as a prop from the parent component
    const { questionArray } = props;
    
    // Store one question at a time from the array of questions to render for to the interface for the user to interact with
    const [ currentQuestion, setCurrentQuestion ] = useState({});

    // Destructure the current question to access all the data that will change with each question
    const { category, correct_answer, difficulty, incorrect_answers, question } = currentQuestion;

    // Initialize a namespace object for the component to store the randomly sorted array of answers;
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

        myComponent.randomizedOrder = randomOrder;
    }

    // Shuffles the correct answer amongs the incorrect answers and returns a order with randomly assorted values
    const shuffleOptions = (correctAnswer, incorrectAnswers) => {

        // If the array of incorrect answers is undefined this conditional logic won't run, preventing the application from breaking
        if (incorrect_answers !== undefined) {
            const initialOrder = [...incorrectAnswers, correctAnswer];
            const randomOrder = randomizeOrder(initialOrder);
            return randomOrder;   
        }

    }

    // Immediately call shuffle function to automatically sort the answers once the question array populates with values 
    shuffleOptions(correct_answer, incorrect_answers);

    return (
        <div className="gameInterface">
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
                                >{value}</li>
                            )
                        }) :
                        null
                }
            </ul>
            <button 
                // Each time the button is clicked a new question object will be stored into state to access and render its contents to the page 
                onClick={() => handleCurrentQuestion(questionArray)}
            >Submit Answer</button>
        </div>
    )
}

export default TriviaGame;