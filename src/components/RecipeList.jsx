import React, { useEffect, useState } from 'react';
import RecipeItem from './RecipeItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

const RecipeList = (props) => {
  const [recipes, setRecipes] = useState([]);  // All recipes loaded initially
  const [displayedRecipes, setDisplayedRecipes] = useState([]); // Subset of recipes to display
  const [loading, setLoading] = useState(true); // Loading for initial API call
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per scroll

  const updateRecipes = async () => {
    props.setProgress(10);
    setLoading(true); // Show spinner while the data is loading

    try {
      console.log(`Calling the query ${props.query}`);
      const response = await axios.get(`http://localhost:5005/${props.query}`);
      console.log(`Called the query ${props.query}`);
      console.log(response);

      // Parse the data
      const parsedData = response.data.map((item) => ({
        d: item._id,
        title: item.title,
        ingredients: item.ingredients,
        servings: item.servings,
        instructions: item.instructions,
      }));

      setRecipes(parsedData);  // Store all recipes
      setDisplayedRecipes(parsedData.slice(0, itemsPerPage));  // Display the first set of recipes
      setLoading(false);  // Stop spinner once data is loaded
      props.setProgress(100);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setLoading(false);
      props.setProgress(100);
    }
  };

  const fetchMoreData = () => {
    const newPage = page + 1;
    setPage(newPage);

    // Add more recipes to the displayed data from the already loaded data
    const newRecipes = recipes.slice(0, newPage * itemsPerPage);
    setDisplayedRecipes(newRecipes);
  };

  useEffect(() => {
    updateRecipes();
  }, [props.query]);

  return (
    <div>
      <h2 className="text-center" style={{ marginTop: '15vh' }}>
        Top Recipes
      </h2>

      {loading && <Spinner />} {/* Show spinner only during the initial load */}

      <InfiniteScroll
        dataLength={displayedRecipes.length}  // Length of currently displayed recipes
        next={fetchMoreData}  // Function to fetch more data from already fetched data
        hasMore={displayedRecipes.length < recipes.length}  // Check if there's more data to display
        loader={<Spinner />}  // Spinner for when fetching more data (scrolling)
        endMessage={<p>That's all hun</p>}
      >
        <div className="container">
          <div className="row">
            {displayedRecipes.map((recipe) => (
              <div className="col-md-4" key={recipe.d}>
                <RecipeItem title={recipe.title} description={recipe.ingredients} />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

RecipeList.propTypes = {
  setProgress: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default RecipeList;
