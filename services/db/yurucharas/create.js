module.exports = knex => {
  return params => {
    const name = params.name;
    const prefecture = params.prefecture;
    const group = params.group;
    const text = params.text;
    const img = params.img;
    return knex("yurucharas")
      .insert({
        name,
        prefecture,
        group,
        text,
        img_url: img
      })
      .then(() => {
        return knex("yurucharas")
          .where({
            name
          })
          .select();
      })
      .then(result => {
        return result[0];
      })
      .catch(err => {
        // throw unknown errors
        throw err;
      });
  };
};
