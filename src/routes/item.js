import express from 'express';
import {
  celebrate,
  Joi
} from 'celebrate';
import itemController from '../controllers/item';

const router = express.Router();
const path = '/user/:userId/item';
// TODO: Item 에 대해서 create, read, update, delete api 를 작성해주세요.

router.get(`${path}s`, celebrate({
  params: {
    userId: Joi.number().required()
  },
  query: {
    order: Joi.string().valid(["asc", "desc"]).optional()
  }
}), itemController.getItems);

router.post(`${path}`, celebrate({
  params: {
    userId: Joi.number().required()
  },
  body: {
    name: Joi.string().required(),
    image_path: Joi.string().regex(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    ).required()
  }
}), itemController.addItem);

router.put(`${path}/:id`, celebrate({
  params: {
    id: Joi.number().required(),
    userId: Joi.number().required()
  },
  body: {
    name: Joi.string().required(),
    image_path: Joi.string().regex(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    ).required()
  }
}), itemController.updateItem);

router.delete(`${path}/:id`, celebrate({
  params: {
    id: Joi.number().required(),
    userId: Joi.number().required()
  }
}), itemController.removeItem);

export default router;
