const Buzz = require('./buzz.model');
// const Comment = require('../Comment/comment.model');

exports.addBuzz = async (newBuzz) => {
  const resBuzz = await Buzz.create(newBuzz);
  let populatedResponse = resBuzz.populate('createdBy','name email').execPopulate();
  return populatedResponse;
};

exports.likeDislikeBuzz = async (action, buzzId, user) => {
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

exports.getAllBuzz = async (page) => {
  const totalBuzzCount = await Buzz.countDocuments(); 
  const allBuzz = await Buzz.find({})
                  .skip(1 * (page -1))
                  .limit(1) // 10 items to display
                  .populate('createdBy','userType name email')
                  .populate('likedBy', 'name')
                  .populate('dislikedBy','name') 
                  .sort({ createdOn: -1 });
                  
  return {allBuzz, totalBuzzCount};
};

exports.deleteBuzz = async (buzzId) => {
  await Buzz.findByIdAndDelete(buzzId);
}