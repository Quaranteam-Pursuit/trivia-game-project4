import { useState } from 'react';
import CategoryDropdown from './CategoryDropdown';
import axios from 'axios'

const InputForm = props => {
    const { setQuestionArray, setStartNewGame } = props;

    const [ questionAmount, setQuestionAmount ] = useState("");

    const [questionCategory, setQuestionCategory ] = useState("");

    const [ questionDifficulty, setQuestionDifficulty ] = useState("");

    // State to hold the response status for API error handling. Default value is null so that the errors can print to page when the value is anything other than null. 
    const [apiResError, setApiResError] = useState(null)
    
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
        }

        // function that selectively deletes key/value pairs from the axios params object if the user leaves any of the non-required fields empty. 
        const deleteParams = () => {
            if (questionCategory === '') {
                delete params.category
            }
            if (questionDifficulty === '') {
                delete params.difficulty
            }
        }

        deleteParams()

        axios({
            url: "https://opentdb.com/api.php",
            method: "GET",
            dataResponse: "JSON",
            params: params

        }).then((response) => {
        // Catch API network errors and throw to error message - OR proceed with sending form data to state
            if (response.status < 200 && response.status < 299) {
                throw Error('error message')
            }
            setQuestionArray(response.data.results);
            setQuestionCategory(null);
            setQuestionAmount(null);
            setQuestionDifficulty(null);
            setStartNewGame(false);
        })
        .catch(error => {
            // Setting error state value so error protocol runs in JSX
            setApiResError(error.message)
        });

    }
    if (apiResError) {
        return(
            <div>
                <CategoryDropdown
                handleCategoryChange={handleCategoryChange}
                apiResError={apiResError}
                setApiResError={setApiResError}
                />
            </div>
        )
    }

    if (apiResError === null) {
        return (
            <form onSubmit={handleSubmit}>
                <legend>Create a Game</legend> 
                <label>Number of Questions</label>
                <select 
                    required 
                    name="numberOfQuestions" 
                    id="numberOfQuestions"
                    onChange={handleAmountChange}
                    >
                    <option value="">Select number of questions</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                </select>
                <label>Category Menu</label>
                <CategoryDropdown
                    handleCategoryChange={handleCategoryChange}
                    apiResError={apiResError}
                    setApiResError={setApiResError}
                />
                <label>Difficulty</label>
                <select 
                    name="questionDifficulty" 
                    id="questionDifficulty"
                    onChange={handleDifficultyChange}
                    >
                    <option value="">Select difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button className="initialSubmit" type="submit">Submit</button>
            </form>
        )
    }
}

export default InputForm;
