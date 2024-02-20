import User from "../models/user-model.js"

async function searchUser (req,res){
    try {
        const searchTerm = req.body.name;
        if (!searchTerm) {
            return res.status(400).json({ message: "Search term is required" });
        }
        const searchResults = await User.find({ 
            name: {
              $regex: '.*' + searchTerm + '.*',
              $options: 'i'
          }})
          res.status(200).send(searchResults);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

async function getuserinfo(req,res){
    try {
        const user = await User.findById(req.body._id)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function addFriend(req,res){
    console.log(req.body._id);
    try {
        const friend = await User.findById(req.body._id)
        req.user.friends.push(friend._id)
        await req.user.save()
        res.status(200).send('Friend Added')
        console.log(req.user,req._id);

    } catch (error) {
        res.status(500).send(error)
    }
}

async function deleteFriend(req,res){
    try {
        const friend = await User.findById(req.body._id)
        req.user.friends.pull(friend._id)
        await req.user.save()
        res.status(200).send('Friend Deleted')
    }catch(error){
        res.status(500).send(error)
    }
}

const peopleController ={
    searchUser,
    addFriend,
    getuserinfo,
    deleteFriend
}
export default peopleController


