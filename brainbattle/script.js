const vegetables = [
  'Carrot','Beans','Tomato','Potato','Cabbage',
  'Capsicum','Onion','Broccoli','Pumpkin','Ladyfinger','Garlic'
];

const nonVeg = ['Chicken','Egg','Fish'];
const others = ['Noodles','Oil','Oats','Cornflour'];

const selectedBox = document.getElementById('selected');

function createList(items, containerId) {
  const container = document.getElementById(containerId);

  items.forEach(item => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    checkbox.value = item;

    checkbox.addEventListener('change', () => {
      checkbox.checked ? addTag(item) : removeTag(item);
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(item));
    container.appendChild(label);
  });
}

function addTag(text) {
  if ([...selectedBox.children].some(t => t.dataset.value === text)) return;

  const tag = document.createElement('div');
  tag.className = 'tag';
  tag.dataset.value = text;
  tag.textContent = text;
  selectedBox.appendChild(tag);
}

function removeTag(text) {
  const tag = [...selectedBox.children].find(t => t.dataset.value === text);
  if (tag) tag.remove();
}

document.getElementById('customInput').addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.value.trim()) {
    addTag(e.target.value.trim());
    e.target.value = '';
  }
});

createList(vegetables, 'vegList');
createList(nonVeg, 'nonVegList');
createList(others, 'otherList');

document.getElementById('getRecipes').addEventListener('click', () => {
  const ingredients = [...selectedBox.children].map(t => t.dataset.value);
  const recipesBox = document.getElementById('recipes');

  if (!ingredients.length) {
    recipesBox.innerHTML = '<div class="recipe">Please select ingredients first.</div>';
    return;
  }

  recipesBox.innerHTML = '<div class="recipe">🤖 AI is thinking...</div>';

  setTimeout(() => {
    recipesBox.innerHTML = '';

    const recipes = [
      {
        name: 'Quick Stir Fry',
        steps: `Stir fry ${ingredients.join(', ')} with oil and spices.`
      },
      {
        name: 'Simple Curry',
        steps: `Slow cook ${ingredients.join(', ')} with onions and masala.`
      },
      {
        name: 'Healthy Bowl',
        steps: `Boil or sauté ${ingredients.join(', ')} and serve with light seasoning.`
      }
    ];

    recipes.forEach(r => {
      const div = document.createElement('div');
      div.className = 'recipe';
      div.innerHTML = `<strong>${r.name}</strong><br>${r.steps}`;
      recipesBox.appendChild(div);
    });
  }, 1200);
});

