import axios from "axios";
import MeetingModel from "../Models/MeetingModel";
import TeamModel from "../Models/TeamModel";
import appConfig from "../Utils/AppConfig";

class DataService {
 
    
    public async getAllTeams(): Promise<TeamModel[]> {
        const response = await axios.get<TeamModel[]>(appConfig.allTeamsURL);
        const teams = response.data;
        return teams;
    };

    public async getMeetingsByTeamId(teamId: number): Promise<MeetingModel[]> {
        const response = await axios.get<MeetingModel[]>(appConfig.meetingsByTeamIdURL + teamId);
        const items = response.data;
        return items;
    };

    public async addMeeting(meeting: MeetingModel): Promise<void> {
        await axios.post<MeetingModel>(appConfig.addMeetingURL, meeting);
    };


}

const dataService = new DataService();

export default dataService;
