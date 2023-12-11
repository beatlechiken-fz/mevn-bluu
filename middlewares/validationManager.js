import { validationResult, body, param } from "express-validator";
import axios from "axios";
export const expressValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const paramLinkValidator = [
  param("id", "Formato no válido de ID").trim().notEmpty().escape(),
  expressValidationResult,
];

export const bodyLinkValidator = [
  body("longLink", "Formato de link incorrecto")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        if (!value.startsWith("https://")) {
          value = `https://${value}`;
        }
        await axios.get(value);
        return value;
      } catch (error) {
        console.log(error);
        throw new Error("Not found longLink 404");
      }
    }),
  expressValidationResult,
];

export const bodyRegisterValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "El password no cumple con los requisitos")
    .trim()
    .isLength({ min: 8 }),
  expressValidationResult,
];

export const bodyLoginValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "El password no cumple con los requisitos")
    .trim()
    .isLength({ min: 8 }),
  expressValidationResult,
];
