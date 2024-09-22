const { MongoClient } = require("mongodb");
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();  // This line should be right after importing dotenv

// Replace the following with your Atlas connection string
const uri = process.env.MONGO_URI;
console.log("URI is")
console.log(uri)
const client = new MongoClient(uri);
// const recipeSchema = new mongoose.Schema({
//     title: String,
//     ingredients: String,
//     servings: String,
//     instructions: String
//   });    
const RECIPE_URL = 'https://api.api-ninjas.com/v1/recipe';
 async function run() {
    try {
        // Connect to the Atlas cluster
         await client.connect();

         // Get the database and collection on which to run the operation
         const db = client.db("Food");
         const col = db.collection("main course");
        let response;
         try{
                // Fetch data from the external API
              response= await axios.get(RECIPE_URL,{
                  headers:{'X-Api-Key':process.env.REACT_APP_RECIPE_API_KEY},
                  params: {query: "noodles", offset: 0}});}
          catch(error){
              console.error('Error fetching recipes:', error);
          }

          let parsedData=response.data.map((item)=>({
                d: item._id,
                title: item.title,
                ingredients: item.ingredients.split('|'),
                servings: item.servings,
                instructions: item.instructions.split('.')
            }));
          

          console.log(parsedData);

         // Insert the documents into the specified collection        
         const p = await col.insertMany(parsedData);
         console.log('Data inserted into MongoDB:', p.insertedCount, 'documents inserted');

        
     }
        catch (e) {
            console.error(e.stack);}

 
     finally {
        await client.close();
    }
}

run().catch(console.dir);
