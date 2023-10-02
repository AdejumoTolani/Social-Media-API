const Conversation = require('../Models/Conversation')

exports.startConversation = async (req, res) => {
    try{
        const convo = {
            members : [req.user._id, req.body.recipient]
        }
        const newConvo = new Conversation(convo);
        await newConvo.save()
        res.status(201).json(newConvo)
    }catch(err){
        res.status(500).send(err)
    }
}


exports.getConversations = async (req, res) => {
    try{
        const conversations = await Conversation.find({
            members:{ $in:[req.user._id] }
        }).populate('members')
        res.status(200).json(conversations)
    }catch(err){
        res.status(500).send(err);
 
    }
}