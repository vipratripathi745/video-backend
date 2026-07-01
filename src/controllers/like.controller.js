import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/like.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const existedLike = await Like.findOne({
        video: videoId,
        likedBy: req.user?._id,
    });

    if (existedLike) {
        await existedLike.deleteOne();

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Video unliked successfully"
            )
        );
    }

    await Like.create({
        video: videoId,
        likedBy: req.user?._id,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Video liked successfully"
        )
    );
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const existedLike = await Like.findOne({
        comment: commentId,
        likedBy: req.user?._id,
    });

    if (existedLike) {
        await existedLike.deleteOne();

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Comment unliked successfully"
            )
        );
    }

    await Like.create({
        comment: commentId,
        likedBy: req.user?._id,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Comment liked successfully"
        )
    );
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    const existedLike = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user?._id,
    });

    if (existedLike) {
        await existedLike.deleteOne();

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Tweet unliked successfully"
            )
        );
    }

    await Like.create({
        tweet: tweetId,
        likedBy: req.user?._id,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Tweet liked successfully"
        )
    );
});

const getLikedVideos = asyncHandler(async (req, res) => {
    const likedVideos = await Like.find({
        likedBy: req.user?._id,
        video: { $ne: null },
    }).populate("video");

    const filteredVideos = likedVideos.filter(
        (like) => like.video !== null
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            filteredVideos,
            "Liked videos fetched successfully"
        )
    );
});

export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos,
};