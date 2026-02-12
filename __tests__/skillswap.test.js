const { filterSkillsByCategory, calculateTotalCost, matchSkillsToUser } = require('../skillswap-functions');

const skills = [
  { title: 'Python Tutoring', category: 'Programming', price: 20 },
  { title: 'Guitar Lessons', category: 'Music', price: 15 },
  { title: 'Resume Review', category: 'Career', price: 0 },
  { title: 'Web Development', category: 'Programming', price: 25 }
];

//wrap the examples in tests
test('Filters skills by category', () => {
  expect(filterSkillsByCategory(skills, 'Programming')).toEqual([
    { title: 'Python Tutoring', category: 'Programming', price: 20 },
    { title: 'Web Development', category: 'Programming', price: 25 }
  ]);
});

test('Returns all skills when category is All', () => {
  expect(filterSkillsByCategory(skills, 'All')).toEqual(skills);
});

test('Returns empty array when no matches', () => {
  expect(filterSkillsByCategory(skills, 'Cooking')).toEqual([]);
});

// failing tests for calculateTotalCost
describe("calculateTotalCost", () => {
  test("returns correct total for different rates and hours", () => {
    expect(calculateTotalCost(20, 2)).toBe(40);
    expect(calculateTotalCost(25, 1.5)).toBe(37.5);
  });

  test("returns 0 for free sessions or zero hours", () => {
    expect(calculateTotalCost(0, 3)).toBe(0);
    expect(calculateTotalCost(20, 0)).toBe(0);
  });
});

// matchSkillsToUser failures
describe("matchSkillsToUser", () => {
  const skills = [
    { title: 'Python Tutoring', category: 'Programming', price: 20 },
    { title: 'JavaScript Help', category: 'Programming', price: 25 },
    { title: 'Guitar Lessons', category: 'Music', price: 15 },
    { title: 'Resume Review', category: 'Career', price: 0 }
  ];

  test("matches by category and max price", () => {
    const user1Needs = { category: 'Programming', maxPrice: 30 };
    expect(matchSkillsToUser(user1Needs, skills)).toEqual([
      { title: 'Python Tutoring', category: 'Programming', price: 20 },
      { title: 'JavaScript Help', category: 'Programming', price: 25 }
    ]);
  });

  test("filters by max price", () => {
    const user2Needs = { category: 'Programming', maxPrice: 20 };
    expect(matchSkillsToUser(user2Needs, skills)).toEqual([
      { title: 'Python Tutoring', category: 'Programming', price: 20 }
    ]);
  });

  test("returns empty array if no matches", () => {
    const user3Needs = { category: 'Cooking', maxPrice: 100 };
    expect(matchSkillsToUser(user3Needs, skills)).toEqual([]);
  });

  test("includes free skills", () => {
    const user4Needs = { category: 'Career', maxPrice: 0 };
    expect(matchSkillsToUser(user4Needs, skills)).toEqual([
      { title: 'Resume Review', category: 'Career', price: 0 }
    ]);
  });
});