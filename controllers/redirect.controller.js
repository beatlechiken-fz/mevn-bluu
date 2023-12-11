import { Link } from "../models/Link.js";

export const redirectLink = async (req, res) => {
  try {
    const { nanoLink } = req.params;
    const link = await Link.findOne({ nanoLink: nanoLink });
    if (!link) return res.status(400).json({ error: "No existe el link" });

    return res.json({ longLink: link.longLink });
  } catch (error) {
    console.log(error);
    if (error.Kind === "ObjectId")
      return res.status(403).json({ error: "Formato incorrecto" });
    return res.status(500).json({ error: "Error de servidor" });
  }
};
