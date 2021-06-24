const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Event, User, Location, Group } = require('../../db/models');


// GET / ---> Get all events
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const { limit } = req.body;
    const events = await Event.findAll({
      include: [
        { model: User, attributes: ["username"] },
        { model: Location, attributes: ["name", "locale"] },
        { model: Group, attributes: ["name"] },
      ],
      order: [
        ['date', 'DESC']
      ],
      limit,
    })
    res.json(events);
  }))

// GET /:id ---> Get one specific event
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const events = await Event.findAll({
      include: [
      { model: User, attributes: "username" },
      { model: Location, attributes: ["name", "locale"] },
      { model: Group, attributes: ["name"] },
    ]
  })
  res.json(events);
}))

// GET / ---> Get one host's events
router.get(
  '/user/:userId',
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const { limit } = req.body;
    const events = await Event.findAll({
      where: {
        hostId: userId
      },
      include: [
        { model: User, attributes: ["username"] },
        { model: Location, attributes: ["name", "locale"] },
        { model: Group, attributes: ["name"] },
      ],
      order: [
        ['date', 'DESC']
      ],
      limit,
    })
    res.json(events);
  }))

// // PUT /   ---> Update Event
// router.put(
//   "/:id",
//   validateGroup,
//   requireAuth,
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const editGroup = await Group.update(req.body, {
//       where: {
//         id: id,
//       },
//     });
//     return res.json(editGroup);
//   })
// );

  module.exports = router;
