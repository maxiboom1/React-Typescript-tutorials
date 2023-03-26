import MeetingModel from "../2-models/meeting-model";
import dal from "../4-utils/dal";

async function dateValidation(meeting: MeetingModel){
    
    const sql = `SELECT EXISTS(SELECT startTime, endTime, teamId FROM meetings 
        WHERE "${meeting.startTime}" > startTime 
        AND "${meeting.endTime}" < endTime 
        AND teamId = ${meeting.teamId})
    `;
    
    const result = await dal.execute(sql);

    let resultAsNum: number;
    
    for (const property in result) {
        resultAsNum = Number(`${property}`)
      }

    console.log('Here is the result of date validation: ' + resultAsNum);

}

export default dateValidation;