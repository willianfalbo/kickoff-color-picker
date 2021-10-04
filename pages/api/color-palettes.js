import knex from "../../clients/knex";

export default async (req, res) => {
  if (req.method === "GET") {
    const colorPalettes = await knex("color_palettes");

    res.status(200).json(colorPalettes);
  } else if (req.method === "PUT") {
    await knex("color_palettes")
      .where({ id: req.body.id })
      .update({ hex_color: req.body.hex_color });

    const [colorPalette] = await knex("color_palettes")
      .where({ id: req.body.id })
      .limit(1);

    res.status(200).json(colorPalette);
  } else if (req.method === "POST") {
    const [id] = await knex("color_palettes")
      .insert({ hex_color: req.body.hex_color });

    res.status(200).json({ id, hex_color: req.body.hex_color });
  } else if (req.method === "DELETE") {
    await knex("color_palettes")
      .where({ id: req.body.id })
      .delete();

    res.status(204).json();
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};
