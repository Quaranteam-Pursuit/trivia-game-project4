import { useEffect, useState } from 'react'
import axios from 'axios'

// Dynamically populate category dropdown menu from API endpoint
const CategoryDropdown = props => {
    const { handleCategoryChange, apiResError, setApiResError } = props;

    // State to hold the categories array
    const [categories, setCategories] = useState([])


    // Call the categories endpoint & set state
    useEffect(() => {
        axios({
            url: 'https://opentdb.com/api_category.php',
        }).then( (res) => {
            // If API call response status is between 200-299, run normally. If outside that range, throw an error to skip dropdown render. 
            if (res.status < 200 && res.status < 299) {
                throw Error(`We can't reach the Open Trivia API right now. Please refresh the page or wait a few minutes.`)
            } 
            setCategories(res.data.trivia_categories)
        })
        .catch(error => {
            setApiResError(error.message)
            console.log(error.message)
        })
    },[] );
            
        {/* Checks the api error state variable for a value other than null, and prints error text if an error is present. */}
        // { apiResError && <div className="errorMessage"><p>We can't reach the Open Trivia API right now.</p><p>Please refresh the page or wait a few minutes.</p></div>}
        if (apiResError) {
            return (
                <div className="errorMessage"><p>We can't reach the Open Trivia API right now.</p><p>Please refresh the page or wait a few minutes.</p></div>
                )
            } 

        if (apiResError === null) {
                return (
                    <div className="categoryDropdown">
                    
                    <label htmlFor="categorySelect"></label>
                    <select required name="categorySelect" id="categorySelect" onChange={handleCategoryChange}>
                        <option value="">Please select a category</option>
                        {
                            categories.map( (individualCat) => {
                                return(
                                    <option 
                                    key={individualCat.id}
                                    value={individualCat.id}
                                    >
                                        {individualCat.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                )
            }
    // )
}

export default CategoryDropdown;