const NotifiModel=require('../models/NotifiModel')
exports.getNotification=async(userId)=>{
    try {
        const notification=await NotifiModel.find({userId})
        return notification
    } catch (error) {
        throw error
    }
}
exports.sendNotification=async(title,message,userId)=>{
    try {
       const notification=new NotifiModel({title,message,userId})
       return await notification.save()
    } catch (error) {
        throw error
    }
}
exports.deleteAllMessage=async(userId)=>{
    try{
        return NotifiModel.deleteMany({userId})
    }
    catch(error){
        throw error
    }
}