export const options = [
  {
    id: 1,
    name: "What interest rate would you like to select?",
    enabled: true,
    type: "select",
    option: ["5 - 6%", "6 - 7%", "7 - 8%", "8 - 9%", "9 - 10%"],
  },
  {
    id: 2,
    name: "What is the expected cash-out amount?",
    enabled: true,
    type: "input",
  },
  {
    id: 3,
    name: "What is the payback duration (in years)?",
    enabled: true,
    type: "input",
  },
  {
    id: 4,
    name: "What are the payback savings tied to the principal or interest rate?",
    enabled: true,
    type: "input",
  },
  {
    id: 5,
    name: "What are the payment savings from eliminating PMI?",
    enabled: true,
    type: "input",
  },
  {
    id: 6,
    name: "What are the payment savings if you roll the fee into the loan balance?",
    enabled: true,
    type: "input",
  },
  {
    id: 7,
    name: "Which region would you like to filter by?",
    enabled: true,
    type: "select",
    option: ["Notheast", "Midwest", "South", "West"],
  },
];
