console.log("Skill Swap loaded");

// Function from skillswap-functions.js
function filterSkillsByCategory(skills, category) {
  if (category === 'All') return skills;
  return skills.filter(skill => skill.category === category);
}

// Get skill cards
const cards = document.querySelectorAll('.card');

// Set up category buttons
document.getElementById('all').addEventListener('click', () => filterCards('All'));
document.getElementById('programming').addEventListener('click', () => filterCards('Programming'));
document.getElementById('music').addEventListener('click', () => filterCards('Music'));
document.getElementById('career').addEventListener('click', () => filterCards('Career'));

// Show and hide cards based on category
function filterCards(category) {
  cards.forEach(card => {
    const skillTitle = card.querySelector('h4').textContent;
    let skillCategory = '';
    
    // Match HTML cards to their categories exactly
    if (skillTitle === 'Football' || skillTitle === 'Gaming') skillCategory = 'Programming';
    else if (skillTitle === 'Cooking advice') skillCategory = 'Career';
    
    // Show if matches or category is All
    if (category === 'All' || category === skillCategory) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
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

// Skills list for matching
const skillsList = [
    { title: 'Python Tutoring', category: 'Programming', price: 20 },
    { title: 'JavaScript Help', category: 'Programming', price: 25 },
    { title: 'Guitar Lessons', category: 'Music', price: 15 },
    { title: 'Resume Review', category: 'Career', price: 0 }
];

findMatchButton.addEventListener('click', () => {
    const userNeeds = {
        category: categoryInput.value,
        maxPrice: parseFloat(maxPriceInput.value) || 0
    };

    const matches = matchSkillsToUser(userNeeds, skillsList);

    // Clear previous results
    matchResultsDiv.innerHTML = '';

    if (matches.length === 0) {
        matchResultsDiv.textContent = 'No matching skills found.';
        return;
    }

    // Display each match as a card
    matches.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.classList.add('card');
        skillDiv.innerHTML = `
            <h4>${skill.title}</h4>
            <p>Category: ${skill.category}</p>
            <p>Price: $${skill.price}</p>
        `;
        matchResultsDiv.appendChild(skillDiv);
    });
});