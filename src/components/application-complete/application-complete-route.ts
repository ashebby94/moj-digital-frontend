import * as express from "express";
import {applicationCompleteGet} from "./application-complete-controller";

const router = express.Router();

router.get("/application-complete", applicationCompleteGet);

export { router as applicationCompleteRouter };
