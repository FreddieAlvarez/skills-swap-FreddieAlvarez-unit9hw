console.log("Skill Swap loaded");

// Function from skillswap-functions.js
function filterSkillsByCategory(skills, category) {
  if (category === 'All') return skills;
  return skills.filter(skill => skill.category === category);
}


// Set up category buttons
document.getElementById('all').addEventListener('click', () => filterCards('All'));
document.getElementById('programming').addEventListener('click', () => filterCards('Programming'));
document.getElementById('music').addEventListener('click', () => filterCards('Music'));
document.getElementById('career').addEventListener('click', () => filterCards('Career'));

// Show and hide cards based on category
function filterCards(category) {
  const cards = document.querySelectorAll('.card'); // get the cards dynamically
  cards.forEach(card => {
    const skillCategory = card.dataset.category; // read category from data attribute
    card.style.display = (category === 'All' || skillCategory === category) ? 'block' : 'none';
  });
}

// COST CALCULATOR
// input fields, button, and display
const rateInput = document.getElementById('rate');
const hoursInput = document.getElementById('hours');
const calculateButton = document.getElementById('calculate');
const totalCostDisplay = document.getElementById('total-cost');

// On click, calculate total and update display
calculateButton.addEventListener('click', () => {
  const rate = parseFloat(rateInput.value) || 0;
  const hours = parseFloat(hoursInput.value) || 0;
  const total = calculateTotalCost(rate, hours);
  totalCostDisplay.textContent = total.toFixed(2);
});

//Match SKills to users\
const categoryInput = document.getElementById('category');
const maxPriceInput = document.getElementById('max-price');
const findMatchButton = document.getElementById('find-match');
const matchResultsDiv = document.getElementById('match-results');

// Skills list for matching(using API call)
let skillsList = [];

async function loadSkills() {
  try {
    skillsList = await window.apiService.fetchSkills();
    console.log("Skills loaded:", skillsList);
  } catch (error) {
    console.error("Failed to load skills:", error);
  }
}

// Call the function to load skills when the page loads
loadSkills();

findMatchButton.addEventListener('click', () => {
    const userNeeds = {
        category: categoryInput.value,
        maxPrice: parseFloat(maxPriceInput.value) || 0
    };

    const matches = matchSkillsToUser(userNeeds, skillsList); 

    //Clear previous results
    matchResultsDiv.innerHTML = '';

    if (matches.length === 0) {
      matchResultsDiv.textContent = 'No matching skills found.';
      return;
    }

    //show each match as a card
    matches.forEach(skill => {
      const skillDiv = document.createElement('div');
      skillDiv.classList.add('card');
      skillDiv.innerHTML = `
          <h4>${skill.title}</h4>
          <p>Category: ${skill.category}</p>
          <p>Price: $${skill.price}</p>`;
        matchResultsDiv.appendChild(skillDiv);
    });
});

  //Add skill creation form
  const addSkillForm = document.getElementById('add-skill-form');
  const skillTitleInput = document.getElementById('skill-title');
  const skillCategoryInput = document.getElementById('skill-category');
  const skillPriceInput = document.getElementById('skill-price');
  const skillDescriptionInput = document.getElementById('skill-description');

  addSkillForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // prevent page reload

    const newSkill = {
      title: skillTitleInput.value,
      category: skillCategoryInput.value,
      price: parseFloat(skillPriceInput.value) || 0,
      description: skillDescriptionInput.value
    };

    try {
        await window.apiService.createSkill(newSkill);
        await loadSkills(); // reload skills
        addSkillForm.reset();
        alert('Skill added successfully!');
    } catch (error) {
        console.error('Failed to add skill:', error);
        alert('Error adding skill. Check console.');
    }
});