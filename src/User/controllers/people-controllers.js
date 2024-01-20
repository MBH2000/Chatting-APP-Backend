import User from "../models/user-model.js"

async function searchUser (req,res){
    try {
        const searchTerm = req.body.name;

        const searchResults = await User.find({ 
            name: {
              $regex: '.*' + searchTerm + '.*',
              $options: 'i'
          }})
          const result = searchResults.map(item => ({ id: item._id, name: item.name, profilePic: item.profilePic }));
          res.status(200).send(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

async function addFriend(req,res){
    console.log(req.body._id);
    try {
        const friend = await User.findById(req.body._id)
        console.log(friend);
        req.user.friends.push(friend._id)

        await req.user.save()
        res.status(200).send('Friend Added')
        console.log(req.user,req._id);

    } catch (error) {
        res.status(500).send(error)
    }
}

const peopleController ={
    searchUser,
    addFriend
}
export default peopleController


