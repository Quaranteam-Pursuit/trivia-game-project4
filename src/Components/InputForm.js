import { useState } from 'react';
import CategoryDropdown from './CategoryDropdown';
import axios from 'axios'

const InputForm = props => {
    const { setQuestionArray, setStartNewGame, setGameSaved } = props;

    const [ questionAmount, setQuestionAmount ] = useState("");

    const [questionCategory, setQuestionCategory ] = useState("");

    const [ questionDifficulty, setQuestionDifficulty ] = useState("");

    // const [ questionType, setQuestionType ] = useState("");
    
    const handleAmountChange = event => {
        setQuestionAmount(event.target.value);
    }

    const handleCategoryChange = event => {
        setQuestionCategory(event.target.value);
    }

    const handleDifficultyChange = event => {
        setQuestionDifficulty(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();

        // setting the baseline parameters for the axios params object.
        const params = {
            amount: questionAmount,
            category: questionCategory,
            difficulty: questionDifficulty,
            // type: questionType
        }

        // function that selectively deletes key/value pairs from the axios params object if the user leaves any of the non-required fields empty. 
        const deleteParams = () => {
            if (questionCategory === '') {
                delete params.category
            }
            if (questionDifficulty === '') {
                delete params.difficulty
            }
            // if (typeDropdown.value === '') {
            //     delete params.type
            // }
        }

        deleteParams()

        axios({
            url: "https://opentdb.com/api.php",
            method: "GET",
            dataResponse: "JSON",
            params: params

        }).then((response) => { 
            setQuestionArray(response.data.results);
            setQuestionCategory(null);
            setQuestionAmount(null);
            setQuestionDifficulty(null);
            setStartNewGame(false);
        });

    }

    return (
        <form onSubmit={handleSubmit}>
            <legend>Choose Game Play</legend>
            <label>Category Menu</label>
            <CategoryDropdown
                handleCategoryChange={handleCategoryChange}
            />
            <label htmlFor="numberOfQuestions" className="sr-only">Question Amounts</label>
            <label>Number of Questions</label>
            <select 
                required 
                name="numberOfQuestions" 
                id="numberOfQuestions"
                onChange={handleAmountChange}
            >
                <option value="">Please select a question amount</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="10">25</option>
                <option value="15">30</option>
                <option value="20">35</option>
                <option value="10">40</option>
                <option value="15">45</option>
                <option value="20">50</option>
            </select>
            <label htmlFor="questionDifficulty" className="sr-only">Question Difficulty</label>
            <label>Difficulty</label>
            <select 
                name="questionDifficulty" 
                id="questionDifficulty"
                onChange={handleDifficultyChange}
            >
                <option value="">Select a difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            {/* <label htmlFor="questionType" className="sr-only">Question Type</label>
            <select require name="questionType" id="questionType">
                <option value="multiple">Multiple Choice</option>
            </select> */}
            <button 
                type="submit"
                onClick={setGameSaved(false)}
            >Play Trivia</button>
        </form>
    )
}

export default InputForm;