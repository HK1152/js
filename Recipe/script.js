let recipeName = document.getElementById('recipeName'); 
let ingredients = document.getElementById('ingredients'); 
let instructions = document.getElementById('instructions'); 
let recipeCategory = document.getElementById('recipeCategory');
let recipeList = document.getElementById('recipeList'); 
let searchRecipes = document.getElementById('searchRecipes'); 
let submitBtn = document.getElementById('submit');
let editIndex = null; 

// Default demo recipes
let defaultRecipes = [
    {
        name: "Khaman Dhokla",
        ingredients: "1 cup besan, 1/4 cup semolina, 1/4 cup yogurt, spices",
        instructions: "Mix besan, semolina, yogurt... steam 20 min.",
        category: "gluten-free"
    },
    {
        name: "Thepla",
        ingredients: "2 cups wheat flour, 1/2 cup besan, yogurt, spices",
        instructions: "Knead dough, roll thin, cook on tawa.",
        category: "vegetarian"
    },
    {
        name: "Undhiyu",
        ingredients: "Mixed vegetables, muthiya, spices, coconut",
        instructions: "Cook all veggies with spices, add muthiya.",
        category: "vegan"
    },
    {
        name: "Paneer Butter Masala",
        ingredients: "Paneer, butter, cream, tomato puree, spices",
        instructions: "Cook tomato gravy, add paneer and cream.",
        category: "vegetarian"
    }
];

// Check localStorage; if empty, use defaults
let recipes = JSON.parse(localStorage.getItem('recipes'));
if (!recipes || recipes.length === 0) {
    recipes = defaultRecipes;
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

window.addEventListener('load', () => displayRecipes());

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Add or update recipe
function addRecipe() {
    let name = recipeName.value;
    let ing = ingredients.value;
    let inst = instructions.value;
    let cat = recipeCategory.value;

    if (name && ing && inst && cat !== "all") {
        if (editIndex === null) {
            let recipe = { name, ingredients: ing, instructions: inst, category: cat };
            recipes.push(recipe);
        } else {
            recipes[editIndex] = { name, ingredients: ing, instructions: inst, category: cat };
            editIndex = null;
            submitBtn.innerText = "Add Recipe";
        }

        saveToLocalStorage();
        displayRecipes();

        recipeName.value = '';
        ingredients.value = '';
        instructions.value = '';
        recipeCategory.value = 'all';
    } else {
        alert("Please fill all fields and select a category!");
    }
}

// Display recipes with Bootstrap cards
function displayRecipes(filteredRecipes = recipes) {
    recipeList.innerHTML = ''; 
    
    if (filteredRecipes.length === 0) {
        recipeList.innerHTML = '<p>No recipes found</p>';
        return;
    }

    filteredRecipes.forEach((recipe, i) => {
        let recipeDiv = document.createElement('div');
        recipeDiv.className = 'col-md-6 recipe';  
        recipeDiv.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${recipe.name}</h5>
                    <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                    <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                    <span class="badge bg-primary">${recipe.category}</span>
                    <div class="mt-3">
                        <button class="btn btn-warning btn-sm" onclick="editRecipe(${i})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteRecipe(${i})">Delete</button>
                    </div>
                </div>
            </div>
        `;
        recipeList.appendChild(recipeDiv);
    });
}

// Edit recipe
function editRecipe(index) {
    let recipe = recipes[index];
    recipeName.value = recipe.name;
    ingredients.value = recipe.ingredients;
    instructions.value = recipe.instructions;
    recipeCategory.value = recipe.category;

    editIndex = index;
    submitBtn.innerText = "Update Recipe";
}

// Delete recipe
function deleteRecipe(index) {
    recipes.splice(index, 1);
    saveToLocalStorage();
    displayRecipes();
}

// Filter
let filterSelector = document.getElementById('filter-selector');
filterSelector.addEventListener('input', function() {
    let filter = filterSelector.value;
    let filteredRecipes = recipes.filter(recipe => {
        if (filter === 'all') return true;
        return recipe.category === filter;
    });
    displayRecipes(filteredRecipes);
});

// Search
searchRecipes.addEventListener('input', function() {
    let search = searchRecipes.value.toLowerCase();
    let filteredRecipes = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(search) ||
        recipe.ingredients.toLowerCase().includes(search) ||
        recipe.instructions.toLowerCase().includes(search)
    );
    displayRecipes(filteredRecipes);
});

submitBtn.addEventListener('click', addRecipe);
