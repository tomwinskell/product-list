import { faker } from '@faker-js/faker';

export const buildProduct = () => {
  return {
    category: faker.commerce.department(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: 'https://via.placeholder.com/250?text=Product+Image',
  };
};

export const buildReview = () => {
  return {
    text: faker.lorem.paragraph(),
    rating: faker.number.int({ min: 1, max: 5 }),
  };
};
