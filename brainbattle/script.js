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

    const maxComboSize = Math.max(1, parseInt(document.getElementById('maxComboSize').value) || 1);
    const maxRecipes = Math.max(1, parseInt(document.getElementById('maxRecipes').value) || 6);

    function getCombinations(arr, k) {
      const res = [];
      function backtrack(start, comb) {
        if (comb.length === k) {
          res.push([...comb]);
          return;
        }
        for (let i = start; i < arr.length; i++) {
          comb.push(arr[i]);
          backtrack(i + 1, comb);
          comb.pop();
        }
      }
      backtrack(0, []);
      return res;
    }

    // build combinations of sizes 1..maxComboSize
    const combos = [];
    const upper = Math.min(maxComboSize, ingredients.length);
    for (let k = 1; k <= upper; k++) {
      combos.push(...getCombinations(ingredients, k));
    }

    if (!combos.length) {
      recipesBox.innerHTML = '<div class="recipe">Not enough ingredients to make recipes.</div>';
      return;
    }

    // limit number of recipes
    const limited = combos.slice(0, maxRecipes);

    limited.forEach((combo, idx) => {
      const name = `${combo.join(' & ')} ${idx % 2 === 0 ? 'Delight' : 'Special'}`;
      const steps = `Use ${combo.join(', ')}${ingredients.length > combo.length ? ' with optional others' : ''}. Cook to taste.`;

      const div = document.createElement('div');
      div.className = 'recipe';
      div.innerHTML = `<strong>${name}</strong><br>${steps}`;
      recipesBox.appendChild(div);
    });
  }, 1200);
});
