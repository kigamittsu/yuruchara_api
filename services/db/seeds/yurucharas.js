const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

exports.seed = (knex, Promise) => {
  const json = fs.readFileSync("../../data/yurucharas.json");
  const yurucharas = JSON.parse(json);

  return knex
    .raw("truncate yurucharas cascade")
    .then(() => {
      return knex.raw("ALTER SEQUENCE yurucharas_id_seq RESTART WITH 1");
    })
    .then(() => {
      return knex("yurucharas").insert(yurucharas);
    });
};
