class MeetingModel {
    meetingId: number;
    teamId: number;
    startTime: string;
    endTime: string;
    meetingDescription: string;
    meetingRoom: string;

  
    public constructor(meeting: MeetingModel) {
      this.meetingId = meeting.meetingId;
      this.teamId = meeting.teamId;
      this.startTime = meeting.startTime;
      this.endTime = meeting.endTime;
      this.meetingDescription = meeting.meetingDescription;
      this.meetingRoom = meeting.meetingRoom;
    }

};

export default MeetingModel;
