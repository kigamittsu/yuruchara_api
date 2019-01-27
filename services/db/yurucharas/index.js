module.exports = knex => {
  return {
    create: require("./create")(knex),
    list: require("./list")(knex),
    update: require("./update")(knex),
    remove: require("./remove")(knex)
  };
};
