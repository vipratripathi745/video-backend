import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.model.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    const subscribed = await Subscription.findOne({
        subscriber: req.user?._id,
        channel: channelId,
    });

    if (subscribed) {
        await subscribed.deleteOne();

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Channel unsubscribed successfully"
            )
        );
    }

    await Subscription.create({
        subscriber: req.user?._id,
        channel: channelId,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Channel subscribed successfully"
        )
    );
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {

});

const getSubscribedChannels = asyncHandler(async (req, res) => {

});

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels,
};