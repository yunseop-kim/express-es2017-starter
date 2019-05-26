import * as service from '../services/user'

async function getUsers(req, res) {
  const users = await service.findAll();
  return res.status(200).json(users);
}

export default {
  getUsers,
};