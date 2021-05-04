"use strict";
const fetch = require("node-fetch");

const theFetch = async () => {
  return answer;
};

const seed = async () => {
  let answers = [];
  for (let i = 0; i < 10; i++) {
    let ownerId = Math.floor(Math.random() * 10);
    let questionId = Math.floor(Math.random() * 10);
    const x = await fetch(
      "https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1"
    );
    let answer = await x.json();
    answer = JSON.stringify(answer);
    answer = await JSON.parse(answer);
    // console.log(answer);
    const obj = { answer: answer[0], ownerId, questionId, content: "" };
    answers.push(obj);
  }
  return answers;
};

console.log(seed());

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
