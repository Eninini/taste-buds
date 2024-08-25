const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');
// import { RECIPE_URL } from '../src/components/RecipeList';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const RECIPE_URL = 'https://api.api-ninjas.com/v1/recipe';
// console.log(RECIPE_URL);
// Connect to MongoDB
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log(error));

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  servings: String,
  instructions: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Endpoint to fetch and save recipes
app.post('/desserts', async (req, res) => {
  try {
    // Fetch data from the external API
    const response= await axios.get(RECIPE_URL,{
      headers:{'X-Api-Key':process.env.REACT_APP_RECIPE_API_KEY},
      params: {query: "dessert", offset: 0}});
    const recipes = response.data; // Adjust based on the API's response structure

    // Store data in MongoDB
    const result = await Recipe.insertMany(recipes);
    
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));