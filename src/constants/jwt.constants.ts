require('dotenv').config(); //not sure why this needs to happen again here but it does

export const jwtConstants = {
  secret: process.env.SECRET,
};