const { AccountModel } = require('../Models');
const { hashPassword, decodePassword, createToken } = require('../Helpers');
require('dotenv').config();

const register = async (req, res) => {
  if (!req.body.email) return res.json({ success: false, result: 'Email address is required but missing, try again' });
  if (!req.body.password) return res.json({ success: false, result: 'Password is required but missing, try again' });
  if (!req.body.accountType)
    return res.json({ success: false, result: 'Account type is required but missing, try again' });

  const { password: pass, ...rest } = req.body;
  const password = hashPassword(pass);
  const payload = { ...rest, password, dateCreated: new Date().toISOString() };
  console.log('Crated user', password, payload);

  try {
    const user = new AccountModel(payload);
    await user.save().then((user) => {
      const token = createToken(user, process.env.SECRET);
      return res.json({ success: true, result: { user, token } });
    });
  } catch (error) {
    console.log('Reacted here', error.message);
    return res.json({ success: false, result: error.message });
  }
};

const login = async (req, res) => {
  if (!req.body.email) return res.json({ success: false, result: 'Email address is required but missing, try again' });
  if (!req.body.password) return res.json({ success: false, result: 'Password is required but missing, try again' });
  const { email, password } = req.body;

  try {
    const user = await AccountModel.findOne({ email });
    if (!user) return res.json({ success: false, result: 'No user found with matching credentials, try again' });
    if (!decodePassword(password, user.password))
      return res.json({ success: false, result: 'Login credentials do not match, try again' });
    const token = 'createToken(user, process.env.SECRET)';
    return res.json({ success: true, result: { user, token } });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getAccount = async (req, res) => {
  if (!req.params.uid) return res.json({ success: true, result: 'User id required to update account' });
  const { uid } = req.params;
  try {
    const result = await AccountModel.findOne({ _id: uid });
    console.log('REsult', result);
    return res.json({ success: true, result });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const updateAccount = async (req, res) => {
  if (!Object.keys(req.body).length)
    return res.json({ success: true, result: 'Atleast one field required to update account' });
  if (!req.params.uid) return res.json({ success: true, result: 'User id required to update account' });
  const { uid } = req.params;
  try {
    const response = await AccountModel.updateOne({ uid }, users);
    if (response.nModified === 0) return res.json({ success: false, result: 'Nothing was updated , try again' });
    return res.json({ success: false, result: 'Account updated successfully' });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getOrganisers = async (req, res) => {
  try {
    await AccountModel.aggregate([ { $sample: { size: 3 } }, { $match: { accountType: 'company' } } ]).then((result) =>
      res.json({ success: true, result })
    );
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getUser = async (req, res) => {
  if (!req.params) return res.json({ success: false, result: 'Organiser id is required and not passed' });
  const { id: _id } = req.params;
  try {
    await AccountModel.findOne({ accountType: 'company', _id }).then((result) => res.json({ success: true, result }));
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getAllOrganisers = async (req, res) => {
  try {
    await AccountModel.find({ accountType: 'company' }).then((result) => res.json({ success: true, result }));
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

module.exports = {
  register,
  login,
  updateAccount,
  getAccount,
  getOrganisers,
  getAllOrganisers,
  getUser
};
