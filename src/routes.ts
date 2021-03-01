import { Router } from "express";
import { AnswerControler } from "./controllers/AnswerControler";
import { NpsControler } from "./controllers/NpsController";
import { SendMailController } from "./controllers/SendMailController";
import { SurveyController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerControler();
const npsController = new NpsControler();

router.post("/users", userController.create);
router.get("/surveys", surveyController.show);
router.post("/surveys", surveyController.create);
router.post("/sendMail", sendMailController.execute);
router.get("/answers/:value", answerController.execute);
router.get("/nps/:survey_id", npsController.execute);

export { router };