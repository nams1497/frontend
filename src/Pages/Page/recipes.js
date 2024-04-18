import React, { useState } from 'react';
import './recipe.css';

// SearchBar Component
const SearchBar = ({ onSearch, onInputChange }) => {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Enter 'egg' to search..."
        onChange={e => onInputChange(e.target.value)}
      />
      <button className="search-button" onClick={onSearch}>Search Recipes</button>
    </div>
  );
};

// RecipeCard Component
const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-image-placeholder"></div> {/* Placeholder for the image */}
      <div className="recipe-info">
        <h2 className="recipe-title">{recipe.title}</h2>
        <p className="recipe-ingredients">{recipe.ingredients}</p>
        <p className="recipe-time">{recipe.time}</p>
        <p className="recipe-has-ingredients">{recipe.hasIngredients}</p>
      </div>
    </div>
  );
};

// Recipes Component
export const Recipes = () => {
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleInputChange = (value) => {
    setInput(value);
  };

  const handleSearch = () => {
    if (input.toLowerCase().includes('egg')) {
      setRecipes(sampleRecipes);
    }
  };

  const sampleRecipes = [
    { title: 'Egg Salad Sandwich', ingredients: 'Bread, Eggs, Mayonnaise', time: '10 mins', hasIngredients: 'You have 2/3 ingredients', imageUrl: 'placeholder-image.jpg' },
    { title: 'Deviled Eggs', ingredients: 'Eggs, Mayonnaise, Mustard', time: '20 mins', hasIngredients: 'You have all ingredients', imageUrl: 'placeholder-image.jpg' },
    { title: 'Scrambled Eggs with Toast', ingredients: 'Bread, Eggs, Butter', time: '15 mins', hasIngredients: 'You have all ingredients', imageUrl: 'placeholder-image.jpg' },
    { title: 'Egg Fried Rice', ingredients: 'Rice, Eggs, Soy Sauce', time: '15 mins', hasIngredients: 'You have 2/3 ingredients', imageUrl: 'placeholder-image.jpg' },
    { title: 'Egg and Veggie Breakfast Burrito', ingredients: 'Tortilla, Eggs, Bell Peppers', time: '20 mins', hasIngredients: 'You have 2/3 ingredients', imageUrl: 'placeholder-image.jpg' },
    { title: 'Egg and Spinach Omelette', ingredients: 'Eggs, Spinach, Cheese', time: '10 mins', hasIngredients: 'You have 2/3 ingredients', imageUrl: 'placeholder-image.jpg' },
    { title: 'Egg McMuffin', ingredients: 'English Muffin, Eggs, Canadian Bacon', time: '15 mins', hasIngredients: 'You have 2/3 ingredients', imageUrl: 'placeholder-image.jpg' },
    { title: 'Egg and Bacon Breakfast Hash', ingredients: 'Potatoes, Eggs, Bacon', time: '25 mins', hasIngredients: 'You have all ingredients', imageUrl: 'placeholder-image.jpg' },
    { title: 'Egg and Avocado Toast', ingredients: 'Bread, Eggs, Avocado', time: '10 mins', hasIngredients: 'You have 2/3 ingredients', imageUrl: 'placeholder-image.jpg' }
  ];

  return (
    <div>
      <div className="toolbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="applogo.png" alt="App Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
          <span style={{ color: 'green', fontWeight: 'bold' }}>EcoEats</span>
        </div>
        <div className="toolbardiv">
          <button onClick={() => console.log("Recipes clicked")}>Recipes</button>
          <button onClick={() => console.log("Information clicked")}>Information</button>
          <button onClick={() => console.log("Recycling Agencies Clicked")}>Recycling Agencies</button>
          <button onClick={() => console.log("Check My Knowledge Clicked")}>Check My Knowledge</button>
        </div>
      </div>
      <div className="App">
        <header></header>
        <SearchBar onInputChange={handleInputChange} onSearch={handleSearch} />
        <div className="recipes-container">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;


