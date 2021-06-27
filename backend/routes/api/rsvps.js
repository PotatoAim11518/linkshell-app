// backend/routes/api/rsvps.js
const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const { requireAuth } = require("../../utils/auth");
const { Event, User, RSVP } = require("../../db/models");

/////// RSVP routes

// GET /user/:id ---> Get a user's RSVPs
router.get(
  "/user/:userId",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const userRSVPs = await RSVP.findAll({
      where: {
        userId
      },
      include: [
        { model: RSVP },
        { model: User }
      ]
    });
    res.json(userRSVPs);
  })
);

// POST /   ---> RSVP to an event
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { userId, eventId } = req.body;
    const newRSVP = await RSVP.create({
      userId,
      eventId,
    });
    return res.json(newRSVP);
  })
  );

  // DELETE /   ---> Remove a RSVP from an event
  router.delete(
    "/",
    requireAuth,
    asyncHandler(async (req, res, next) => {
      const { userId, eventId } = req.body;
      const deleteRSVP = await RSVP.findOne({
      where: {
        userId,
        eventId,
      },
    });

    if (deleteRSVP) {
      await deleteRSVP.destroy();
    }
    return res.json(deleteRSVP);
  })
);

module.exports = router;
