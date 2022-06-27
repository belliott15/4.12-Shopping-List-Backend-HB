const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Item = require('../models/Item');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try{
      const newItem = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(newItem);
    }catch(e){
      next(e);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try{
      const allItems = await Item.getAll(req.user.id);
      res.json(allItems);
    }catch(e){
      next(e);
    }
  })
  .put('/:id', authenticate, authorize, async (req, res, next) => {
    try{
      const item = await Item.updateById(req.params.id, req.body);
      res.json(item);
    } catch(e) {
      next(e);
    }
  })

;

// TO DO - implement items CRUD
