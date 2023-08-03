import Database from "@ioc:Adonis/Lucid/Database"
import ActivityLogModel from "App/Models/ActivityLogModel"

export default class ActivityLogService {


    public static async createActivityLog( activityLogModel : ActivityLogModel) {
        await Database.table('activitylogs').insert(activityLogModel.$attributes)
    }
    
    public static async getActivityLogs({response ,auth}) {
        await auth.use('api').authenticate()
        const activityLogs = await Database.from('activitylogs').select('*')
        return response.json(activityLogs)

    }

}