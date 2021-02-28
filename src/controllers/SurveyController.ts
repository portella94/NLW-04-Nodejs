import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveyController {
    async create(request: Request, response: Response) {
        const { title, description } = request.body;

        const surveysRepository = getCustomRepository(SurveysRepository);
        const survey = surveysRepository.create({ title, description });
        // const userAlreadyExists = await surveysRepository.findOne({ email });
        // if (userAlreadyExists) {
        //     return response.status(400).json({
        //         error: "User already exists"
        //     });
        // }
        await surveysRepository.save(survey);

        return response.status(201).json(survey);
    }
}

export { SurveyController };

