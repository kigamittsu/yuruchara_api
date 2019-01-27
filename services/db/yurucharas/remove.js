module.exports = knex => {
  return params => {
    const id = params.id;
    return knex("yurucharas")
      .where({
        id
      })
      .del()
      .then(() => {
        return `Deleted id : ${id}`;
      })
      .catch(err => {
        throw err;
      });
  };
};
