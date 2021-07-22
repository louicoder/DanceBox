const { AccountModel } = require('../Models');

const createAccounts = async (req, res) => {
  const user = new AccountModel(req.body);

  try {
    await user.save();
    return res.json({ success: true, result: 'Account created successfully' });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getAccount = async (req, res) => {
  if (!req.params.uid) return res.json({ success: true, result: 'User id required to update account' });
  const { uid } = req.params;
  try {
    const result = await AccountModel.findOne({ uid });
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
    await AccountModel.aggregate([
      { $sample: { size: 4 } },
      { $match: { accountType: 'company' } }
    ]).then((result) => {
      res.json({ success: true, result });
    });
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
  createAccounts,
  updateAccount,
  getAccount,
  getOrganisers,
  getAllOrganisers
};
