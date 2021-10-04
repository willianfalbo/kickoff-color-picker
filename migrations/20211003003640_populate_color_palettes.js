
exports.up = function (knex) {
    return knex("color_palettes").insert([
        { hex_color: "#ef476f" },
        { hex_color: "#ffd166" },
        { hex_color: "#06d6a0" },
        { hex_color: "#118ab2" },
        { hex_color: "#073b4c" },
    ]);
};

exports.down = function (knex) {
    return knex("color_palettes").delete();
};
