import { useEffect, useState } from 'react'
import axios from 'axios'

// Dynamically populate category dropdown menu from API endpoint
const CategoryDropdown = props => {
    const { handleCategoryChange } = props;

    // State to hold the categories array
    const [categories, setCategories] = useState([])

    // Call the categories endpoint & set state
    useEffect(() => {
        axios({
            url: 'https://opentdb.com/api_category.php',
        }).then( (res) => {
            setCategories(res.data.trivia_categories)
        })
    },[] );

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

export default CategoryDropdown;