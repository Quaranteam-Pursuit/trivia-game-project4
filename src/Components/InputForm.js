import { useState } from 'react';
import CategoryDropdown from './CategoryDropdown';
import axios from 'axios'


const InputForm = () => {

    const [ questionAmount, setQuestionAmount ] = useState("");

    const [questionCategory, setCategory ] = useState([""]);

    const [ questionDifficulty, setQuestionDifficulty ] = useState("");

    const [ questionType, setQuestionType ] = useState("");
    
    const handleAmountChange = event => {
        setQuestionAmount(event.target.value);
    }

    const handleCategoryChange = event => {
        setCategory(event.target.value);
    }

    const handleDifficultyChange = event => {
        setQuestionDifficulty(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        axios({
            url: "https://opentdb.com/api.php",
            method: "GET",
            dataResponse: "json",
            params: {
                amount: 9,
                category: 9,
                difficulty: "easy"
            }
          }).then((response) => {
            console.log(response);
          });
        console.log("submit happened")    
    }

    return (
        <form onSubmit={handleSubmit}>
            <CategoryDropdown
                handleCategoryChange={handleCategoryChange}
            />
            <label htmlFor="numberOFQuestions" className="sr-only">Question Amounts</label>
            <select 
                required 
                name="numberOFQuestions" 
                id="numberOFQuestions"
                onChange={handleAmountChange}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
            <label htmlFor="questionDifficulty" className="sr-only">Question Difficulty</label>
            <select 
                required 
                name="questionDifficulty" 
                id="questionDifficulty"
                onChange={handleDifficultyChange}
            >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            {/* <label htmlFor="questionType" className="sr-only">Question Type</label>
            <select require name="questionType" id="questionType">
                <option value="multiple">Multiple Choice</option>
            </select> */}
            <button type="submit">Submit</button>
        </form>
    )
}

export default InputForm;