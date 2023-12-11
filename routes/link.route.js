import { Router } from "express";
import {
  createLink,
  getLink,
  getLinks,
  removeLink,
  updateLink,
} from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  bodyLinkValidator,
  paramLinkValidator,
} from "../middlewares/validationManager.js";
const router = Router();

router.get("/", requireToken, getLinks);

router.get("/:id", requireToken, paramLinkValidator, getLink);

router.post("/", requireToken, bodyLinkValidator, createLink);

router.patch("/:id", requireToken, paramLinkValidator, updateLink);

router.delete("/:id", requireToken, paramLinkValidator, removeLink);

export default router;
