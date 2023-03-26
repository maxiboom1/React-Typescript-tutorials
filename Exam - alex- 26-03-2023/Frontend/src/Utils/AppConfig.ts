class AppConfig {
    
    public allTeamsURL = "http://localhost:4000/api/teams/";
    
    public meetingsByTeamIdURL = "http://localhost:4000/api/meetings-by-teams/";
    
    public addMeetingURL = "http://localhost:4000/api/meetings/";
    
}

const appConfig = new AppConfig();

export default appConfig;
