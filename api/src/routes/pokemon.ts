import { Router } from "express";
import { getList, getPokemon } from "../controllers/pokemon";

const router = Router();

router.get("/pokemon", getList);
router.get(`/pokemon/:id`, getPokemon);

export default router;
