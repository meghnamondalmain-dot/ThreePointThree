// --- Hamburger Logic ---
const hamburger = document.getElementById('hamburger');
const ingredientMenu = document.getElementById('ingredientMenu');
const closeMenu = document.querySelector('.close-menu');

// Toggle Menu
hamburger.onclick = () => ingredientMenu.classList.add('active');
closeMenu.onclick = () => ingredientMenu.classList.remove('active');

// Click outside to close
window.addEventListener('click', (e) => {
    if (e.target !== hamburger && !ingredientMenu.contains(e.target)) {
        ingredientMenu.classList.remove('active');
    }
});

// --- Dropdown Ingredient Selection ---
const ingredientOptions = document.querySelectorAll('.ing-opt');

ingredientOptions.forEach(btn => {
    btn.onclick = () => {
        const selectedIng = btn.getAttribute('data-ing');
        
        // Use the existing logic to add to userPantry
        if (!userPantry.includes(selectedIng)) {
            userPantry.push(selectedIng);
            renderPantry();
            
            // Optional: Close menu after selection
            // ingredientMenu.classList.remove('active');
        }
    };
});

// (Keep all your existing Recipe matching and Slideshow logic below this)



//not from here plsss
const recipes = [
    {
        name: "Honey Garlic Chicken",
        ingredients: ["chicken", "honey", "garlic", "soy sauce"],
        tags: ["High Protein", "Quick"],
        time: "20 min",
        img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500",
        instructions: "1. Sear chicken in a pan. 2. Mix honey, garlic, and soy sauce. 3. Pour over chicken and simmer until thickened."
    },
    {
        name: "Mediterranean Chickpea Bowl",
        ingredients: ["chickpeas", "cucumber", "tomato", "lemon"],
        tags: ["Healthy", "Budget", "Vegan"],
        time: "10 min",
        img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
        instructions: "1. Rinse chickpeas. 2. Chop vegetables. 3. Toss with lemon juice, olive oil, and salt."
    },
    {
        name: "Sweet Potato Curry",
        ingredients: ["sweet potato", "coconut milk", "curry powder", "spinach"],
        tags: ["Healthy", "Warm"],
        time: "30 min",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ZqMgQL-3OZ62AX792TcaeMxOeBbMQT806g&s",
        instructions: "1. Sauté sweet potatoes. 2. Add curry powder and coconut milk. 3. Simmer until soft, stir in spinach at the end.",
    },
    {
        name: "Classic Tomato Pasta",
        ingredients: ["pasta", "tomato", "garlic", "basil"],
        tags: ["Budget", "Quick"],
        time: "15 min",
        img: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=500",
        instructions: "1. Boil pasta. 2. Sauté garlic and tomatoes in olive oil. 3. Mix pasta with sauce and top with basil.",
    },


    {
        name:"Chicken Ressala",
        ingredients:["onion","curd","garlic","ginger","chicken","ressala"],
        tags:["Taste burster","delcious"],
        time:"1 hr",
        img:"https://static01.nyt.com/images/2025/11/20/multimedia/AS-Two-Roast-Chickens-With-Citrus-and-Sage-gqwk-copy/AS-Two-Roast-Chickens-With-Citrus-and-Sage-gqwk-copy-mediumThreeByTwo440-v2.jpg?quality=75&auto=webp",
        instructions:"1.marinate the chicken first in viniger & curd. 2.Put it in the pan and saute with onion-garlic masala. 3.Serve it with dryed chillies on the top."
    },

    {
        name:"Panner Tikka",
        ingredients:["panner","curd","onion","capsicum"],
        tags:["veg delight","yum"],
        time:"30 min",
        img:"https://spicecravings.com/wp-content/uploads/2020/10/Paneer-Tikka-Featured-1.jpg",
        instructions:"1.Marinate it first. 2. Add spices and veggies in the pan fry it 3.grill it and it is ready to serve.",
    },
    
    {
        name:"Dosa",
        ingredients:["rice","pulse"],
        tags:["Southindian special","Healty","Buget"],
        time:"15 min",
        img:"https://www.awesomecuisine.com/wp-content/uploads/2009/06/Plain-Dosa.jpg",
        instructions:"1.Prepare pan with oil. 2.In low flame spread the batter in an outward,spiral motion,to form thin circle 3.Serve it after it's cooked",
    },

     {
        name:"Biriyani",
        ingredients:["rice","coriander","onion","chicken","mint"],
        tags:["indian-cusine","Hydrabadi style"],
        time:"65 min",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnA4oGRy7_mYltdrJvNZLE1GbQFz7whBcLNw&s",
        instructions:"1. Marinate the chicken 2.Boil the rice 3.Layer the biriyani add fried onions,fresh mint and coriander",
    },

{
        name:"Palak panner",
        ingredients:["panner","coriander","onion","mint"],
        tags:["indian-cusine","mother's special"],
        time:"30 min",
        img:"https://profusioncurry.com/wp-content/uploads/2020/05/palak-paneer-served-with-rice-and-naan.jpg",
        instructions:"1. Marinate the panner 2.grind mintand coriander leaves & mix with the panner in a pan to cook 3.it's ready to serve ",
    },















];

let userPantry = [];

// DOM Elements
const input = document.getElementById('ingredientInput');
const pantryList = document.getElementById('pantryList');
const recipeResults = document.getElementById('recipeResults');
const modal = document.getElementById('recipeModal');
const modalBody = document.getElementById('modalBody');

// 1. Add Ingredient Functionality
document.getElementById('addBtn').onclick = () => {
    const val = input.value.trim().toLowerCase();
    if (val && !userPantry.includes(val)) {
        userPantry.push(val);
        renderPantry();
    }
    input.value = '';
};

function renderPantry() {
    pantryList.innerHTML = userPantry.map(ing => `<span class="tag">${ing}</span>`).join('');
}

document.getElementById('clearBtn').onclick = () => {
    userPantry = [];
    renderPantry();
    recipeResults.innerHTML = '';
};

// 2. Find Recipes Functionality
document.getElementById('findRecipesBtn').onclick = () => {
    const matched = recipes.filter(r => r.ingredients.some(ing => userPantry.includes(ing)));
    displayRecipes(matched);
};

function displayRecipes(list) {
    if (list.length === 0) {
        recipeResults.innerHTML = "<p>Try adding 'chicken', 'pasta', or 'chickpeas'!</p>";
        return;
    }
    recipeResults.innerHTML = list.map((r, index) => `
        <div class="recipe-card">
            <img src="${r.img}">
            <div style="padding:15px">
                <h3>${r.name}</h3>
                <p>⏱ ${r.time} | ${r.tags.join(', ')}</p>
                <button class="view-recipe-btn" onclick="openRecipe(${recipes.indexOf(r)})">View Recipe</button>
            </div>
        </div>
    `).join('');
}

// 3. Modal Functionality (Brief Page)
function openRecipe(index) {
    const r = recipes[index];
    modalBody.innerHTML = `
        <img src="${r.img}" style="width:100%; height:300px; object-fit:cover; border-radius:15px;">
        <h2 style="color:var(--terracotta)">${r.name}</h2>
        <p><strong>Ingredients:</strong> ${r.ingredients.join(', ')}</p>
        <hr>
        <h3>Cooking Instructions:</h3>
        <p>${r.instructions}</p>
    `;
    modal.style.display = "block";
}

document.querySelector('.close').onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

// 4. Slideshow Logic
let slideIndex = 0;
function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 4000); 
}
showSlides();