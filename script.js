// Function to fetch a random meal from the API
async function fetchRandomMeal() {
  // Send request to the API to fetch a random meal
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  
  // Parse the JSON response
  const data = await response.json();
  
  // Explore the structure of the JSON response (log it to the console)
  console.log(data);

  // Extract the first meal from the response
  const meal = data.meals[0]; // The response contains a "meals" array, and we need the first item

  // Extract relevant information
  const mealName = meal.strMeal;
  const mealImage = meal.strMealThumb;
  const mealCategory = meal.strCategory;
  const mealInstructions = meal.strInstructions;

  // Extract the ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && measure) {
          ingredients.push({ ingredient, measure });
      }
  }

  // Display the meal details on the webpage
  displayMeal(mealName, mealImage, mealCategory, ingredients, mealInstructions);
}

// Function to display the meal details on the webpage
function displayMeal(name, image, category, ingredients, instructions) {
  // Get the element to display the meal information
  const mealContainer = document.getElementById('meal-container');

  // Display the meal details
  mealContainer.innerHTML = `
      <h2>${name}</h2>
      <img src="${image}" alt="${name}" />
      <p><strong>Category:</strong> ${category}</p>
      
      <h3>Ingredients:</h3>
      <ul>
          ${ingredients.map(ing => `<li>${ing.ingredient}: ${ing.measure}</li>`).join('')}
      </ul>
      
      <h3>Instructions:</h3>
      <p>${instructions}</p>
  `;
}

// Call the fetchRandomMeal function when the page is loaded
document.addEventListener('DOMContentLoaded', fetchRandomMeal);

