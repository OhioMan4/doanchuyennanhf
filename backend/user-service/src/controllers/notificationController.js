const notificationService=require('../service/notificationService')

exports.getNotification=async(req,res)=>{
    try {
        const userId=req.user.userId
        const notification=await notificationService.getNotification(userId)
        res.json(notification)
    } catch (error) {
        res.status(500).json({ message: 'Error getNotification', error: error.message });
    }
}
exports.sendNotification=async(req,res)=>{
    try {

        const userId=req.user.userId
        const {title,message}=req.body
        const notification=await notificationService.sendNotification(title,message,userId)
        res.json(notification)
    } catch (error) {
        res.status(500).json({ message: 'Error sendNotification', error: error.message });
    }
}
exports.deleteAllNotification=async(req,res)=>{
    try{
       const userId=req.user.userId;
       const deleteted=await notificationService.deleteAllMessage(userId);
       res.status(200).json({message:"delete successfully"});
    }
    catch(error){
        res.status(500).json({ message: 'Error Delete Notification', error: error.message });
    }
}

