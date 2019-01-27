module.exports = knex => {
  return params => {
    if (params === undefined) {
      return knex("yurucharas").select();
    } else if (params.id) {
      if (params.id.match(/^\d{1,3}/)) {
        return knex("yurucharas")
          .where({
            id: params.id
          })
          .select()
          .then(result => {
            return result[0];
          });
      }
    } else if (params.name) {
      return knex("yurucharas")
        .where("name", "like", `%${params.name}%`)
        .orWhere("prefecture", "like", `%${params.name}%`)
        .select()
        .then(result => {
          return result;
        });
    } else {
      return knex("yurucharas").select();
    }
  };
};
