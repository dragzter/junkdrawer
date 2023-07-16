const UserModel = require("../../db/model/UserModel.js");

async function getUser(userId) {
  return await UserModel.findOne({ id: userId }).exec();
}

async function getUserByLocal(localId) {
  return await UserModel.findOne({ local_id: localId }).exec();
}

async function findAndUpdate(userId, update) {
  return await UserModel.findOneAndUpdate({ id: userId }, update);
}

async function saveUser(user, res) {
  try {
    const _user = new UserModel(user);
    await _user.save();
    return res.sendStatus(200);
  } catch {
    return res.sendStatus(500);
  }
}

module.exports = { getUser, getUserByLocal, saveUser, findAndUpdate };
