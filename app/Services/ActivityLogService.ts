export default class ActivityLogService {


    public static async create({ request, auth }) {
        const activityLogModel = request.body()
        const user = await auth.authenticate()
        const activityLog = await user.related('activityLogs').create(activityLogModel)
        return activityLog
    }

    public static async get({ auth }) {
        const user = await auth.authenticate()
        const activityLogs = await user.related('activityLogs').query()
        return activityLogs
    }

    public static async update({ request, auth }) {
        const activityLogModel = request.body()
        const user = await auth.authenticate()
        const activityLog = await user.related('activityLogs').updateOrCreate({ id: activityLogModel.id }, activityLogModel)
        return activityLog
    }

    public static async delete({ request, auth }) {
        const activityLogModel = request.body()
        const user = await auth.authenticate()
        const activityLog = await user.related('activityLogs').query().where('id', activityLogModel.id).delete()
        return activityLog
    }
    

}