const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  try{
    const item = await Item.getById(req.params.id);
        
    if (!item || item.user_id !== req.user.id) {
      throw new Error('Sorry! You do not have access to view this page.');
    }
  }catch(e){
    e.status = 403;
    next(e);
  }
};
