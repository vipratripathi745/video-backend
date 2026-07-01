import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
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

    console.log("===== toggleCommentLike =====");
    console.log("Comment ID:", commentId);
    console.log("User ID:", req.user?._id);

    console.log("Before findOne");

    const existedLike = await Like.findOne({
        comment: commentId,
        likedBy: req.user?._id,
    });

    console.log("After findOne");
    console.log(existedLike);

    if (existedLike) {
        console.log("Deleting Like");
        await existedLike.deleteOne();

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Comment unliked successfully"
            )
        );
    }

    console.log("Creating Like");

    await Like.create({
        comment: commentId,
        likedBy: req.user?._id,
    });

    console.log("Like Created");

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Comment liked successfully"
        )
    );
});

const toggleTweetLike = asyncHandler(async (req, res) => {

});

const getLikedVideos = asyncHandler(async (req, res) => {
    const likedVideos = await Like.find({
        likedBy: req.user?._id,
        video: { $ne: null }
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