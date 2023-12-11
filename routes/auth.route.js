import { Router } from "express";
import {
  login,
  register,
  userData,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator,
} from "../middlewares/validationManager.js";
const router = Router();

router.post("/register", bodyRegisterValidator, register);
router.post("/login", bodyLoginValidator, login);
router.get("/protected", requireToken, userData);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);

export default router;
