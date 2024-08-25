import React, { useEffect, useState } from 'react';
import RecipeItem from './RecipeItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';

export const RECIPE_URL = 'https://api.api-ninjas.com/v1/recipe'
const RecipeList = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateRecipes = async () => {
    props.setProgress(10);
    try{
        const response= await axios.get(RECIPE_URL,{
            headers:{'X-Api-Key':process.env.REACT_APP_RECIPE_API_KEY},
            params: {query: props.query, offset: 10}
        });
    
    // let parsedData = await data.json();
    setRecipes(response.data);
    setTotalResults(response.data.length);
    setLoading(false);
    props.setProgress(100);
    }
    catch (error) {
        console.error('Error fetching recipes:', error);
        setLoading(false);
        props.setProgress(100);
      }
    
  };

  

//   const fetchMoreData = async () => {
//     const url = `https://api.example.com/recipes?page=${page + 1}&pageSize=${props.pageSize}`;
//     setPage(page + 1);
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     setRecipes(recipes.concat(parsedData.recipes));
//     setTotalResults(parsedData.totalResults);
//   };

const fetchMoreData = async () => {
    const newPage = page + 1;
    setPage(newPage);
    try {
      const response = await axios.get(RECIPE_URL, {
        headers: { 'X-Api-Key': process.env.REACT_APP_RECIPE_API_KEY },
        params: { query: props.query, offset: newPage * 10 }
      });

      setRecipes(recipes.concat(response.data));
      setTotalResults(recipes.length);
    } catch (error) {
      console.error('Error fetching more recipes:', error);
    }
  };

  useEffect(() => {
    updateRecipes();
  }, []);

  
  return (
    <div>
      <h2 className="text-center" style={{ marginTop: '15vh' }}>
        {/* {props.category.charAt(0).toUpperCase() + props.category.slice(1)}  */}
         Top Recipes
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={recipes.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Spinner />}
        endMessage={<p>That's all hun</p>}
      >
        <div className="container">
          <div className="row">
            {recipes.map((recipe) => (
              <div className="col-md-4" key={recipe.id}>
                <RecipeItem title={recipe.title} description={recipe.description}  />
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