import {
  ESCROW_OPTIONS,
  generateRandomPastDate,
  getRandomFloat,
  getRandomInteger,
  OCCUPANCY_TYPE,
  PROPERTY_TYPE,
  US_STATES,
} from "../../constants";

export const dataGenerator = (count: number) => {
  const result = [];
  for (let i = 1; i <= count; i++) {
    const data = {
      loan_id: `LN-${i}`,
      product_type: "CN-30",
      location: US_STATES[Math.floor(Math.random() * US_STATES.length)],
      origination_date_of_mortgage: generateRandomPastDate().toISOString(),
      loan_term: getRandomInteger(20, 30),
      investor: "FAnny mae",
      interest_rate: getRandomFloat(7, 12),
      original_property_value: getRandomInteger(50000, 60000),
      current_estimated_property_value: getRandomInteger(70000, 80000),
      original_loan_balance: getRandomInteger(10000, 30000),
      original_loan_to_value: getRandomInteger(60, 70),
      payment: getRandomFloat(2000, 3000),
      mortgage_insurance: getRandomFloat(40, 100),
      current_loan_balance: getRandomInteger(60, 70),
      current_loan_to_value: getRandomInteger(70, 80),
      escrow: ESCROW_OPTIONS[Math.floor(Math.random() * ESCROW_OPTIONS.length)],
      propery_type:
        PROPERTY_TYPE[Math.floor(Math.random() * PROPERTY_TYPE.length)],
      occupancy_type:
        OCCUPANCY_TYPE[Math.floor(Math.random() * OCCUPANCY_TYPE.length)],
    };
    result.push(data);
  }
  return result;
};
