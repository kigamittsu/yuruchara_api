exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("prefectures", t => {
      t.increments().index();
      t.string("name", 50).notNullable();
    })
    .then(() => {
      return knex.schema.createTable("groups", t => {
        t.increments().index();
        t.string("name", 50).notNullable();
      });
    })
    .then(() => {
      return knex.schema.createTable("yurucharas", t => {
        t.increments() // auto-incrementing id column
          .index(); // index this column

        t.string("name", 50) // maximum length of 15 characters
          .notNullable() // add a not-null constraint to this column
          .index(); // index it

        t.string("prefecture", 50);
        t.string("group", 50);

        // t.integer("prefecture_id")
        //     .notNullable()
        //     .unsigned()
        //     .references("prefectures.id");

        // t.integer("group_id")
        //     .notNullable()
        //     .unsigned()
        //     .references("groups.id");

        t.string("text", 2048);
        t.string("img_url", 2048);
      });
    })
    .then(() => {
      return knex.schema.createTable("rankings", t => {
        t.integer("year").unsigned();
        t.integer("rank").unsigned();
        t.integer("yuruchara_id").references("yurucharas.id");
        t.primary(["year", "rank"]);
      });
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .hasTable("yurucharas")
    .then(() => {
      return knex.schema.dropTable("rankings");
    })
    .then(() => {
      return knex.schema.dropTable("yurucharas");
    })
    .then(() => {
      return knex.schema.dropTable("groups");
    })
    .then(() => {
      return knex.schema.dropTable("prefectures");
    });
};
