// backend/routes/api/index.js
const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');

const sessionRouter = require('./session');
const usersRouter = require('./users');
const groupsRouter = require('./groups');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/groups', groupsRouter);

// -----TEST ROUTES FOR MIDDLEWARE-----
// // GET /api/set-token-cookie
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'DElmo'
//       },
//     })
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

// // GET /api/restore-user
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // GET /api/require-auth
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

router.post('/test', (req, res) => {
  res.json({requestBody: req.body})
})

module.exports = router;
