const Buzz = require('./buzz.model');
const sharedService = require('../shared.service');

exports.addBuzz = async (buzz, userEmail) => {
  const user = await sharedService.getUser(userEmail);
  const newBuzz = {
    ...buzz,
    createdBy: user._id
  }
  const resBuzz = await Buzz.create(newBuzz);
  let populatedResponse = resBuzz.populate('createdBy','name email').execPopulate();
  return populatedResponse;
};

exports.likeDislikeBuzz = async (action, buzzId, userEmail) => {
  const user = await sharedService.getUser(userEmail);
  const buzzToUpdate = await Buzz.findById(buzzId);

  if(action === 'like'){
    if(!buzzToUpdate.likedBy.includes(user._id) && !buzzToUpdate.dislikedBy.includes(user._id) ){
      buzzToUpdate.likedBy.push(user);  // Add to likes if not present anywhere
    } else if(buzzToUpdate.likedBy.includes(user._id)){
      buzzToUpdate.likedBy.remove(user._id) // Remove ID if already present in Likes
    } else if(buzzToUpdate.dislikedBy.includes(user._id)){
      buzzToUpdate.dislikedBy.remove(user._id) // Remove ID if already present in Dislikes
      buzzToUpdate.likedBy.push(user);
    }
  }

  if(action === 'dislike'){
    if(!buzzToUpdate.likedBy.includes(user._id) && !buzzToUpdate.dislikedBy.includes(user._id) ){
      buzzToUpdate.dislikedBy.push(user);  // Add to likes if not present anywhere
    } else if(buzzToUpdate.dislikedBy.includes(user._id)){
      buzzToUpdate.dislikedBy.remove(user._id) // Remove ID if already present in Dislikes
    } else if(buzzToUpdate.likedBy.includes(user._id)){
      buzzToUpdate.likedBy.remove(user._id) // Remove ID if already present in Likes
      buzzToUpdate.dislikedBy.push(user);
    }
  }

  await buzzToUpdate.save();
  return buzzToUpdate;
}

exports.getAllBuzz = () => {
  const allBuzz = Buzz.find({})
                  .populate('createdBy','userType name email')
                  .populate('likedBy', 'name')
                  .populate('dislikedBy','name') 
                  .sort({ createdOn: -1 });
  return allBuzz;
};

exports.deleteBuzz = async (buzzId) => {
  await Buzz.deleteOne({_id: buzzId}); 
}