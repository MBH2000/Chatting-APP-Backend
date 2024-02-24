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
    try {
        const friend = await User.findById(req.body._id)
        req.user.pending.push(friend._id)
        friend.requests.push(req.user._id)
        await req.user.save()
        await friend.save()
        res.status(200).send('Friend Request send')

    } catch (error) {
        res.status(500).send(error)
    }
}

async function deleteFriend(req,res){
    try {
        const friend = await User.findById(req.body._id)
        req.user.friends.pull(friend._id)
        friend.friends.pull(req.user._id)
        await req.user.save()
        await friend.save()
        res.status(200).send('Friend Deleted')
    }catch(error){
        res.status(500).send(error)
    }
}

async function accept(req,res){
    try {
        const friend = await User.findById(req.body._id)
        req.user.friends.push(friend._id)
        req.user.requests.pull(friend._id)
        friend.friends.push(req.user._id)
        friend.pending.pull(req.user._id)
        await req.user.save()
        await friend.save()

        res.status(200).send('Friend Added')

    } catch (error) {
        res.status(500).send(error)
    }
}

async function reject(req,res){
    try {
        const friend = await User.findById(req.body._id)
        req.user.requests.pull(friend._id)
        friend.pending.pull(req.user._id)
        await req.user.save()
        await friend.save()

        res.status(200).send('Request Rejected')

    } catch (error) {
        res.status(500).send(error)
    }
}

//test
const peopleController ={
    searchUser,
    addFriend,
    getuserinfo,
    deleteFriend,
    accept,
    reject
}
export default peopleController


