const { buildSchema } = require("graphql");
const config = require("./config");
const db = require("./services/db")(config.db);

const schema = buildSchema(`
  type Yuruchara {
    id: ID!
    name: String!
    prefecture: String
    group: String
    text: String
    img_url: String
  }
  
  type Query {
    yurucharas: [Yuruchara]
    id(id: ID): Yuruchara
    name(name: String): [Yuruchara]
    prefecture(name: String): [Yuruchara]
  }


  type Mutation {
    createYuruchara(name: String, prefecture: String, group: String, text: String, img_url: String): Yuruchara
    updateYuruchara(id: ID!, name: String, prefecture: String, group: String, text: String, img_url: String): Yuruchara
    removeYuruchara(id: ID!): String
  }
`);

// The root provides the resolver functions for each type of query or mutation.
const root = {
  yurucharas: () => {
    return db.yurucharas.list();
  },
  id: request => {
    return db.yurucharas.list({
      id: request.id
    });
  },
  name: request => {
    return db.yurucharas.list({
      name: request.name
    });
  },
  prefecture: request => {
    return db.yurucharas.list({
      name: request.name
    });
  },
  createYuruchara: request => {
    return db.yurucharas.create({
      name: request.name,
      prefecture: request.prefecture,
      group: request.group,
      text: request.text,
      img_url: request.img
    });
  },
  updateYuruchara: request => {
    return db.yurucharas.update({
      id: request.id,
      name: request.name,
      prefecture: request.prefecture,
      group: request.group,
      text: request.text,
      img_url: request.img
    });
  },
  removeYuruchara: request => {
    return db.yurucharas.remove({
      id: request.id
    });
  }
};

module.exports = {
  schema,
  root
};
