const Chat = require('../../models/chat')
const Message = require('../../models/message')

module.exports = {
    getChat,
    getMessages,
    sendMessages,
    createGroup
  };

async function getChat(req, res) {
    const partnerId = req.params.id;
    const userId = req.user._id;
    let chat = await Chat.findOne({ //let variable bcause the value can be changed if chat not found 
        participants: { $all: [partnerId, userId] } //$all is a mongoose property to find property include both of the user id
      }).populate('messages').populate('participants', 'name avatar') //carry messages and users username and profilepic

    if (!chat) { //if chat not found create a new one between theses 2 users
    chat = new Chat({
        participants: [partnerId, userId],
        messages: [] // Starting with an empty messages array
    })
    await chat.save();
    chat = await Chat.findById(chat._id).populate('messages').populate('participants', 'name avatar');
      }
      res.json({
        _id: chat._id, //send the chat.id with populated messages and user details
        participants: chat.participants
      });
}

async function getMessages(req, res) {
    const chatID = req.params.id;
    const messages = await Message.find({ chat: chatID })
    .sort({ date: -1 }) //sort by date, newest first
    .populate('sender', 'username profilePicture') // Populate sender details
    .populate('receiver', 'username profilePicture') // Populate receiver details
    res.json(messages)
}   

