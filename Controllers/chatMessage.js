const Message = require('../Models/ChatMessage')

exports.sendMessage = async (req, res) => {
    const newMessage = {
        sender: req.user._id,
        content:req.body,
        conversationId:req.params.id,
        read:false
    }
    try{
        const savedMessage = new Message(newMessage)
        await savedMessage.save()
        res.status(201).json(savedMessage);

    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.getMessages = async (req, res) => {
    try{
        const messages = await Message.find({
            conversationId : req.params.id
        })
        res.status(200).json(messages)
    }catch(err){
        res.status(500).json(err);
    }
}