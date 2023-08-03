import ActivityLogService from "App/Services/ActivityLogService";


export default class ActivityLogsController {


    public async getActivityLogs({response , auth}) {
        await ActivityLogService.getActivityLogs({response , auth})
    }
    
}
