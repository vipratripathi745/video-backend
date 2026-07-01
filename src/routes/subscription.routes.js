import { Router } from "express";
import {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels,
} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/c/:channelId").post(
    verifyJWT,
    toggleSubscription
);

router.route("/user/:channelId").get(
    getUserChannelSubscribers
);

router.route("/subscribed/:subscriberId").get(
    getSubscribedChannels
);

export default router;