module.exports = knex => {
  return params => {
    const id = params.id;
    const name = params.name;
    const prefecture = params.prefecture;
    const group = params.group;
    const text = params.text;
    const img = params.img;

    if (name) {
      return knex("yurucharas")
        .where("id", id)
        .update("name", name)
        .then(result => {
          if (result === 1) {
            return knex("yurucharas")
              .where("id", id)
              .select()
              .then(result => {
                return result[0];
              });
          }
        })
        .catch(err => {
          // throw unknown errors
          throw err;
        });
    }
    if (prefecture) {
      return knex("yurucharas")
        .where("id", id)
        .update("prefecture", prefecture)
        .then(result => {
          return result;
        })
        .catch(err => {
          // throw unknown errors
          throw err;
        });
    }
    if (group) {
      return knex("yurucharas")
        .where("id", id)
        .update("group", group)
        .then(result => {
          return result;
        })
        .catch(err => {
          // throw unknown errors
          throw err;
        });
    }
    if (text) {
      return knex("yurucharas")
        .where("id", id)
        .update("text", text)
        .then(result => {
          return result;
        })
        .catch(err => {
          // throw unknown errors
          throw err;
        });
    }
    if (img) {
      return knex("yurucharas")
        .where("id", id)
        .update("img_url", img)
        .then(result => {
          return result;
        })
        .catch(err => {
          // throw unknown errors
          throw err;
        });
    }
  };
};
