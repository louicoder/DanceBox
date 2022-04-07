const Bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { AccountModel, CommentsModel } = require('../Models');
require('dotenv').config();

const paginateHelper = (page, limit, totalDocuments, result, res) => {
  // console.log('RESSSSSS', page, limit, totalDocuments, result.length);
  try {
    return res.json({
      result,
      totalDocuments,
      success: true,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalDocuments / parseInt(limit)),
      last: parseInt(page) === Math.ceil(totalDocuments / parseInt(limit))
    });
  } catch (error) {
    return error500(res, error);
  }
};

// FUNCTION CREATES A VALID JWT TOKEN TO BE USED ON REQUESTS TO THE SERVER
const createToken = (payload) => JWT.sign(JSON.stringify(payload), process.env.SECRET);

// VALIDATE SENT TOKEN ON ROUTES THAT NEED PROTECTION
const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let result;
  if (authHeader) {
    const token = req.headers.authorization;

    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = JWT.verify(token, process.env.SECRET);
      // Let's pass back the decoded token to the request object
      req.user = result;
      // We call next to pass execution to the subsequent middleware
      next();
    } catch ({ message }) {
      // Throw an error just in case anything goes wrong with verification
      res.status(401).json({ success: false, error: message });
    }
  } else {
    res.status(401).json({ success: false, result: 'Authentication error. Token required.' });
  }
};

const userFiller = async (array, field = '_id') => {
  try {
    const userIds = [ ...array.map((r) => r[field]) ];
    const res = await AccountModel.find({ _id: { $in: userIds } });
    const users = [ ...res.map((r) => r._doc) ];

    let final = [];
    for (const item of array) {
      const result = users.find((r) => r._id.toString() === item._doc[field]);
      if (result) {
        const { password, ...user } = result;
        final.push({ ...item._doc, user });
      }
    }
    return final;
  } catch (error) {
    return;
  }
};

const pickRandomArrayElements = (arr, count = 7) => {
  let _arr = [ ...arr ];
  return [ ...Array(count) ].map(() => _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0]);
};

// const commentsFiller = async (_id, type, authorId) => {
//   try {
//     let query = { _id, type };
//     if (authorId) query = { ...query, authorId };
//     // forof(comment)
//     return await CommentsModel.find(query).countDocuments();
//   } catch (error) {
//     return;
//   }
// };

const hashPassword = (stringToHash) => Bcrypt.hashSync(stringToHash, 10);

const decodePassword = (password, hashedPassword) => Bcrypt.compareSync(password, hashedPassword);

const dateWithoutOffset = () =>
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -1);

module.exports = {
  paginateHelper,
  createToken,
  validateToken,
  hashPassword,
  decodePassword,
  userFiller,
  pickRandomArrayElements,
  dateWithoutOffset
  // commentsFiller
};
