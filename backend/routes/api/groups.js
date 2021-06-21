// backend/routes/api/groups.js
const router = require('express').Router();
const { check } = require('express-validator');

const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Group } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation')


// GET /
router.get(
  '/',
  asyncHandler(async (_req, res, next) => {
    const groups = await Group.findAll();
    res.json(groups)
  })
)

// GET /:id
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    console.log(req)
    const group = await Group.findByPk(id);
    res.json(group)
  })
  )

  // POST /   ---> Create new Group
  router.post(
    '/',
    requireAuth,
    asyncHandler(async (req, res, next) => {
      const { name, about, typeId, ownerId } = req.body;
  })
)


// DELETE
module.exports = router;
