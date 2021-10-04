
exports.up = function (knex) {
    return knex.schema.createTable("color_palettes", function (table) {
        table.increments("id");
        table.string("hex_color", 255).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("color_palettes");
};
