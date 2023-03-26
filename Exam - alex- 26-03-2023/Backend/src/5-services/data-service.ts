import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import TeamModel from "../2-models/team-model";
import MeetingModel from "../2-models/meeting-model";

async function getAllTeams(): Promise<TeamModel[]> {
    
    const sql = "SELECT * FROM teams";
    
    const teams = await dal.execute(sql);
    
    return teams;
    
}

async function getMeetingsByTeamId(teamId: number): Promise<MeetingModel[]> {
    
    const sql = "SELECT * FROM meetings WHERE teamId = ? ";
    
    const meetingsByTeamId = await dal.execute(sql, [teamId]);
    
    return meetingsByTeamId;

}

async function addMeeting(meeting: MeetingModel): Promise<MeetingModel> {

    const sql = "INSERT INTO meetings VALUES(DEFAULT, ?, ?, ?, ?, ?)";

    const result: OkPacket = await dal.execute(sql, [
        meeting.teamId,
        meeting.startTime, 
        meeting.endTime, 
        meeting.meetingDescription, 
        meeting.meetingRoom
    ]);

    meeting.meetingId = result.insertId; // get assigned id from DB and set it to returned meeting
    
    return meeting;
  }

export default {
    getAllTeams,
    getMeetingsByTeamId,
    addMeeting
};


