import React from 'react';
import './RecipeItem.css';
const RecipeItem = (props) => {
  let { title, ingredients } = props;
  return (
    <div className="my-3">
      <div className="card">
        {/* <img src={imageUrl ? imageUrl : "https://i.ytimg.com/vi/W2biNcRiiM8/maxresdefault.jpg"} className="card-img-top" alt="Recipe" /> */}
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{ingredients}</p>
          {/* <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {new Date(date).toLocaleString()}</small></p> */}
          {/* <a rel="noreferrer" href={recipeUrl} target="_blank" className="btn btn-sm" style={{ color: 'white', backgroundColor: '#27445C' }}>View Recipe</a> */}
        </div>
      </div>
    </div>
  );
}

export default RecipeItem;