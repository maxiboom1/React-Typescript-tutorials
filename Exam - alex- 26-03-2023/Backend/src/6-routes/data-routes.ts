import express, { Request, Response, NextFunction } from "express";
import MeetingModel from "../2-models/meeting-model";
import dataService from "../5-services/data-service";
import dateValidation from "../5-services/date-validator";

const router = express.Router();

router.get("/teams",async (request: Request, response: Response, next: NextFunction) => {
      
    try {
        const teams = await dataService.getAllTeams();
        response.json(teams);
      } catch (err: any) {
        next(err);
      }
    }
  );

router.get("/meetings-by-teams/:teamId",async (request: Request, response: Response, next: NextFunction) => {
      
  try {
        const teamId = +request.params.teamId;
        const meetingsByTeamId = await dataService.getMeetingsByTeamId(teamId);
        response.json(meetingsByTeamId);
      } catch (err: any) {
        next(err);
      }
    }
  );

router.post("/meetings",async (request: Request, response: Response, next: NextFunction) => {
      
    try {
        const meeting = new MeetingModel(request.body);
        
        // BONUS 2 => its not completed since there was time limit - but the sql query was done (look at services/date-validator)
        // since its not completed, i just run the validator without interrupt the process.  
        await dateValidation(meeting);

        
        const addedMeeting = await dataService.addMeeting(meeting)
        response.status(201).json(addedMeeting);
      } catch (err: any) {
        next(err);
      }
    }
  );
  

export default router;
