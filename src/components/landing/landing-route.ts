import * as express from "express";
import {applyPost, landingGet} from "./landing-controller";

const router = express.Router();

router.get("/", landingGet);
router.post("/", applyPost);

export { router as landingRouter };
