import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsControler {

    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull())
        });

        const detractors = surveysUsers.filter((survey) =>
            survey.value >= 0 && survey.value <= 6
        );

        const detractorLength = detractors.length;

        const promoters = surveysUsers.filter((survey) =>
            survey.value >= 9 && survey.value <= 10
        );

        const promotersLength = promoters.length;

        const passives = surveysUsers.filter((survey) =>
            survey.value >= 7 && survey.value <= 8
        );

        const passivesLength = passives.length;

        const totalAnswers = surveysUsers.length;

        const nps = Number((((promotersLength - detractorLength) / totalAnswers) * 100).toFixed(2));

        return response.json({
            detractors,
            promoters,
            passives,
            nps
        });
    }
}

export { NpsControler };
