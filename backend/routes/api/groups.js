// backend/routes/api/groups.js
const router = require("express").Router();
const { check } = require("express-validator");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const { jwtConfig } = require("../../config");
const { secret } = jwtConfig;
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Group, Type, User, UserGroup } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");

const validateGroup = [
  check("name")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid group name."),
  check("name")
    .isLength({ min: 3, max: 128 })
    .withMessage("Please provide a group name between 3 and 128 characters."),
  check("about")
    .exists({ checkFalsy: true })
    .withMessage("Please tell us about your group."),
  check("about")
    .isLength({ min: 10, max: 2000 })
    .withMessage(
      "Please provide a description between 10 and 2000 characters."
    ),
  check("typeId")
    .exists({ checkFalsy: true })
    .withMessage("Please select a group type."),
  check("ownerId")
    .exists({ checkFalsy: true })
    .withMessage("Please be logged in to edit this group."),
  handleValidationErrors,
];

/////// Group routes

// POST /   ---> Create new Group
router.post(
  "/",
  validateGroup,
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const newGroup = await Group.create(req.body);
    return res.json(newGroup);
  })
);


// GET / ---> Get all groups
router.get(
  "/",
  asyncHandler(async (_req, res, next) => {
    const groups = await Group.findAll({
      include: [
        { model: Type, attributes: ["id", "name"] },
        { model: User, attributes: ["username"] },
      ],
    });
    res.json(groups);
  })
  );

// GET /:id  ---> Get a group
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const group = await Group.findByPk(id, {
      include: [
        { model: Type, attributes: ["name"] },
        { model: User, attributes: ["username"] },
      ],
    });
    res.json(group);
  })
  );

  // GET /user/:id ---> Get a user's groups
router.get(
  "/user/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const userGroups = await UserGroup.findAll({
      where: {
        userId: id,
      },
      include: [{ model: Group }, { model: User, attributes: ["username"] }],
    });
    res.json(userGroups);
  })
);

// PUT /   ---> Update Group
router.put(
  "/:id",
  validateGroup,
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const editGroup = await Group.update(req.body, {
      where: {
        id: id,
      },
    });
    return res.json(editGroup);
  })
  );

  // DELETE ---> Delete a Group
  router.delete(
    "/:groupId",
    requireAuth,
    asyncHandler(async (req, res, next) => {
      const { groupId } = req.params;
    const currentGroup = await Group.findByPk(groupId);
    if (!currentGroup) throw new Error("Cannot find matching group");

    const { token } = req.cookies;
    await jwt.verify(token, secret, null, async (err, jwtPayload) => {
      const { id } = jwtPayload.data;
      const owner = currentGroup.ownerId === id ? true : false;
      if (owner) {
        await currentGroup.destroy();
      }
    });
    return res.json({ groupId });
  })
  );


  /////// UserGroup routes

  // POST /   ---> Join a new user group
  router.post(
    "/:groupId/user/:userId/join",
    requireAuth,
    asyncHandler(async (req, res, next) => {
      const { groupId, userId } = req.params;
      const newUserGroup = await UserGroup.create({
        userId,
        groupId,
      });
      return res.json(newUserGroup);
    })
    );

    // DELETE /   ---> Remove a user from a group
  router.delete(
    "/:groupId/user/:userId/leave",
    requireAuth,
    asyncHandler(async (req, res, next) => {
      const { id } = req.user;
      const { groupId, userId } = req.params;
      const currentUserGroup = await UserGroup.findOne({
        where: {
          userId,
          groupId,
        },
      });

      if (id === userId) {
        await currentUserGroup.destroy();
      }
      return res.json({ currentUserGroup });
    })
    );

    module.exports = router;
