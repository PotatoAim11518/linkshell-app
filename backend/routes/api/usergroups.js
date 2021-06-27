// backend/routes/api/groups.js
const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const { requireAuth } = require("../../utils/auth");
const { Group, User, UserGroup } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");

/////// UserGroup routes

// GET /user/:id ---> Get a user's groups
router.get(
  "/user/:userId",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const userGroups = await UserGroup.findAll({
      where: {
        userId: userId
      },
      include: [
        { model: Group },
        { model: User }
      ],
    });
    res.json(userGroups);
  })
);

// POST /   ---> Join a new user group
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { userId, groupId } = req.body;
    const newUserGroup = await UserGroup.create({
      userId,
      groupId,
    });
    return res.json(newUserGroup);
  })
);

// DELETE /   ---> Remove a user from a group
router.delete(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { userId, groupId } = req.body;
    const deleteUserGroup = await UserGroup.findOne({
      where: {
        userId,
        groupId,
      },
    });

    if (deleteUserGroup) {
      await deleteUserGroup.destroy();
    }
    return res.json(deleteUserGroup);
  })
);

module.exports = router;
