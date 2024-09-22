const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
// import { RECIPE_URL } from '../src/components/RecipeList';

dotenv.config();
// const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const recipeSchema = new mongoose.Schema({
  _id: String,
  title: String,
  ingredients: [String],  // Defining ingredients as an array of strings
  servings: String,
  instructions: [String]  // Defining instructions as an array of strings
});


// const RECIPE_URL = 'https://api.api-ninjas.com/v1/recipe';
// console.log(RECIPE_URL);
// Connect to MongoDB
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log(error));



const Dessert = mongoose.model('dessert', recipeSchema);
const MainCourse = mongoose.model('MainCourse', recipeSchema, 'main course');

const Starters= mongoose.model('starters', recipeSchema);

// const response= async()=> {await axios.get(RECIPE_URL,{
//   headers:{'X-Api-Key':process.env.REACT_APP_RECIPE_API_KEY},
//   params: {query: "dessert", offset: 0}})};
// const recipes = response.data; // Adjust based on the API's response structure
//   console.log(recipes);

// Endpoint to fetch and save recipes
// app.get('/desserts', async (req, res) => {
//   try {
//     // Fetch data from the external API
//     // const response = await axios.get(RECIPE_URL, {
//     //   headers: { 'X-Api-Key': process.env.REACT_APP_RECIPE_API_KEY },
//     //   params: { query: "dessert", offset: 0 }
//     // });
//     // const recipes = response.data; // Adjust based on the API's response structure
//     // console.log(recipes);
//     // Store data in MongoDB
//     const result = await Recipe.insertMany(recipes);
//     console.log(result);
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// // });

app.get('/desserts', async (req, res) => {
 console.log("Calling dessers API")
 
  try {
    const recipes = await Dessert.find({});
    console.log(recipes)
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes from MongoDB:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/main-course', async(req,res)=>{
  console.log("Calling main-course API")
  try {
    const recipes = await MainCourse.find({});
    console.log("recipes is:")
    console.log(recipes)
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes from MongoDB:', error);
    res.status(500).json({ message: error.message });
  }
})

app.get('/starters', async(req,res)=>{
  console.log("calling starter")
  const servings = "1 Servings"
  try{
    const recipes = await Starters.find({servings});
    console.log(recipes)
    res.status(200).json(recipes);
  }
  catch(error){
    console.error('Error fetching recipes from MongoDB:', error);
    res.status(500).json({ message: error.message });
  }
})

// Start server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));