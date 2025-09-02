let recipeName = document.getElementById('recipeName'); 
let ingredients = document.getElementById('ingredients'); 
let instructions = document.getElementById('instructions'); 
let recipeCategory = document.getElementById('recipeCategory');
let recipeList = document.getElementById('recipeList'); 
let searchRecipes = document.getElementById('searchRecipes'); 
let submitBtn = document.getElementById('submit');
let editIndex = null; 

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
    },
    {
        name: "Veg Fried Rice",
        ingredients: "Cooked rice, mixed vegetables, soy sauce, garlic",
        instructions: "Stir-fry garlic, veggies, add rice & soy sauce.",
        category: "vegan"
    },
    {
        name: "Brownie",
        ingredients: "Flour, cocoa powder, butter, sugar, eggs",
        instructions: "Mix, bake at 180°C for 25 minutes.",
        category: "gluten-free"
    }
];

let recipes = JSON.parse(localStorage.getItem('recipes'));
if (!recipes || recipes.length === 0) {
    recipes = defaultRecipes;
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

window.addEventListener('load', () => displayRecipes());

function saveToLocalStorage() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

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

function editRecipe(index) {
    let recipe = recipes[index];
    recipeName.value = recipe.name;
    ingredients.value = recipe.ingredients;
    instructions.value = recipe.instructions;
    recipeCategory.value = recipe.category;

    editIndex = index;
    submitBtn.innerText = "Update Recipe";
}

function deleteRecipe(index) {
    recipes.splice(index, 1);
    saveToLocalStorage();
    displayRecipes();
}

let filterSelector = document.getElementById('filter-selector');
filterSelector.addEventListener('input', function() {
    let filter = filterSelector.value;
    let filteredRecipes = recipes.filter(recipe => {
        if (filter === 'all') return true;
        return recipe.category === filter;
    });
    displayRecipes(filteredRecipes);
});

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
