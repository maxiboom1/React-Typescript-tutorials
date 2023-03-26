import { ChangeEvent, useEffect, useState } from "react";
import MeetingModel from "../../../Models/MeetingModel";
import TeamModel from "../../../Models/TeamModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./Home.css";

// MUI elements
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableHead } from "@mui/material";


function Home(): JSX.Element {
   
    const [teams, setTeams] = useState<TeamModel[]>([]);
    const [meetings, setMeetings] = useState<MeetingModel[]>([]);
    
    useEffect(() => {
        
        dataService.getAllTeams()
        .then(
            (response)=>{setTeams(response)}
        )
        .catch((err) => notifyService.error(err));
    
    }, []);


    async function getMeetings(args:ChangeEvent<HTMLSelectElement>){
        const teamId = +args.target.value;
        const meetings = await dataService.getMeetingsByTeamId(teamId);
        setMeetings(meetings);        
    }

    function formatTime(time: string): string {
        const dateObj = new Date(time);
        const dateString = dateObj.toLocaleDateString("en-GB");
        const timeString = dateObj.toLocaleTimeString("en-GB", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        return `${dateString} | ${timeString}`;

    }

    function durationCalc(startTimeStr: string, endTimeStr: string): string{
        const startTime = new Date(startTimeStr).valueOf(); 
        const endTime = new Date(endTimeStr).valueOf();
        console.log((endTime - startTime)/3600000);
        const durationInHours = (endTime - startTime)/3600000;
        return durationInHours.toString().slice(0,4);
    }
    return (
        <div className="Home">
            <h2>Select team:</h2>
            <select defaultValue="" onChange={getMeetings}>
                
                <option value="" disabled>Choose relevant team:</option>
                {teams.map((t) => (<option key={t.teamId} value={t.teamId}>{t.teamName}</option>))}
            
            </select>
            <br />
            <br /> 
           <h3>Scheduled meetings:</h3>
            <div className="meetings_table">
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 100}} size="small">
                
                    <TableHead>
                        <TableRow className="table_head">
                            <TableCell>Room: </TableCell>
                            <TableCell >Start time: </TableCell>
                            <TableCell >End time: </TableCell>
                            <TableCell >Duration(Hours): </TableCell>
                            <TableCell >Description:</TableCell>

                        </TableRow>
                    </TableHead>
                    
                    <TableBody >
                        {meetings.map((m) => (
                        <TableRow className="table_rows" hover key={m.meetingDescription}>
                            
                            <TableCell sx={{ fontSize: "0.7rem"}} component="th" scope="row" >{m.meetingRoom} </TableCell>
                            <TableCell sx={{ fontSize: "0.7rem"}} component="th" scope="row" >{formatTime(m.startTime)} </TableCell>
                            <TableCell sx={{ fontSize: "0.7rem"}} component="th" scope="row" >{formatTime(m.endTime)} </TableCell>
                            <TableCell sx={{ fontSize: "0.7rem"}} component="th" scope="row" >{durationCalc(m.startTime, m.endTime)} </TableCell>
                            <TableCell sx={{ fontSize: "0.7rem"}} component="th" scope="row" >{m.meetingDescription} </TableCell>


                        </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            </div>


        </div> 
                        
    );
}

export default Home;
