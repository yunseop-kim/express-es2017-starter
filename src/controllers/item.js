import {
  errorHandler,
  validate
} from '../utils'
import * as service from '../services/item'
async function getItems(req, res) {
  try {
    const order = req.query.order;
    const item = await service.findAll(req.params.userId, order)
    return res.status(200).json(item);
  } catch (error) {
    return errorHandler(error, res)
  }
}

async function addItem(req, res) {
  try {
    validate(req.body);
    const {
      name,
      image_path
    } = req.body
    const addItem = await service.add(req.params.userId, {
      name,
      image_path
    })
    return res.status(200).json(addItem);
  } catch (error) {
    return errorHandler(error, res)
  }
}

async function updateItem(req, res) {
  try {
    validate(req.body);
    const {
      name,
      image_path
    } = req.body
    const updateItem = await service.update(req.params.userId, req.params.id, {
      name,
      image_path
    })

    return res.status(200).json(updateItem);
  } catch (error) {
    return errorHandler(error, res)
  }
}

async function removeItem(req, res) {
  try {
    const result = await service.remove(req.params.userId, req.params.id);
    return res.status(204).json(result);
  } catch (error) {
    return errorHandler(error, res)
  }
}


export default {
  getItems,
  addItem,
  updateItem,
  removeItem
};
