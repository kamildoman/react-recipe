import React, {useEffect, useState} from "react";
import './App.css';
import Recipe from "./Recipe"


function App() {

  const [recipe, setRecipe] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("")
  
  const APP_ID = process.env.REACT_APP_API_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;
  

  useEffect(() => {getRecipe();}, [query])

  async function getRecipe(){
    const res = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await res.json();
    setRecipe(data.hits)
    console.log(data.hits)

  }

  function changeInput(e){
    setSearch(e.target.value)
  }


  function searchForRecipes(e){
    e.preventDefault();
    setQuery(search)
    setSearch("")
  }

  return (
    <div>
      <h1 className="heading">Search for recipes!</h1>
      <form onSubmit={searchForRecipes} className="search-form">
        <input onChange={changeInput} className="search-bar" type="text" value={search}/>
        <button className="search-button" type="submit">Submit</button>
      </form>
      <div className="recipes">
      {recipe.map(rec => 
      (
        <Recipe 
        key={rec.recipe.url} 
        url={rec.recipe.url}
        image = {rec.recipe.image} 
        title={rec.recipe.label} 
        calories={Math.floor(rec.recipe.calories)}
        ingredients={rec.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
