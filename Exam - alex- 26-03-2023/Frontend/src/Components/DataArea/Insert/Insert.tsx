import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MeetingModel from "../../../Models/MeetingModel";
import TeamModel from "../../../Models/TeamModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./Insert.css";

function Insert(): JSX.Element {
    
    const [teams, setTeams] = useState<TeamModel[]>([]);

    const { register, handleSubmit } = useForm<MeetingModel>();

    const navigate = useNavigate();

    useEffect(() => {
        dataService
          .getAllTeams()
          .then((teams) => setTeams(teams))
          .catch((err) => notifyService.error(err));
    }, []);

    async function send(meeting: MeetingModel) {
        try {
          await dataService.addMeeting(meeting);
          notifyService.success("New meeting created!");
          navigate("/home");
        } catch (err: any) {
          notifyService.error(err);
        }
      }

    return (

        <div className="meetingForm">
			      <h2>Add meeting:</h2>
            <form onSubmit={handleSubmit(send)}>
                
                <label>Choose Team:</label>
                <select defaultValue="" {...register("teamId")} required>
                <option value="" disabled>Choose team...</option>
                {teams.map((t) => (<option key={t.teamId} value={t.teamId}>{t.teamName}</option>))}
                </select>

                <label>Meeting Room:</label>
                <input type="text" {...register("meetingRoom")} required />
                
                <label>Meeting start time: </label>
                <input type="datetime-local" {...register("startTime")} required />
                
                <label>Meeting end time: </label>
                <input type="datetime-local" {...register("endTime")} required />                
                
                <label>Description: </label>
                <input type="text" {...register("meetingDescription")} required />                

                <button>Add Meeting!</button>
            </form>
        </div>
    );
}

export default Insert;
