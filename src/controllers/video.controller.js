import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    const videoFileLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!videoFileLocalPath) {
        throw new ApiError(400, "Video file is required");
    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is required");
    }

    const videoFile = await uploadOnCloudinary(videoFileLocalPath);

    if (!videoFile) {
        throw new ApiError(400, "Video upload failed");
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!thumbnail) {
        throw new ApiError(400, "Thumbnail upload failed");
    }

    const video = await Video.create({
        videoFile: videoFile.secure_url,
        thumbnail: thumbnail.secure_url,
        title,
        description,
        duration: Number(videoFile.duration) || 0,
        owner: req.user?._id,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            video,
            "Video published successfully"
        )
    );
});

const getAllVideos = asyncHandler(async (req, res) => {
    const videos = await Video.find({
        isPublished: true,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            videos,
            "Videos fetched successfully"
        )
    );
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            video,
            "Video fetched successfully"
        )
    );
});

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { title, description } = req.body;

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this video");
    }

    if (title) {
        video.title = title;
    }

    if (description) {
        video.description = description;
    }

    const thumbnailLocalPath = req.file?.path;

    if (thumbnailLocalPath) {
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

        if (!thumbnail) {
            throw new ApiError(400, "Thumbnail upload failed");
        }

        video.thumbnail = thumbnail.secure_url;
    }

    await video.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            video,
            "Video updated successfully"
        )
    );
});

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this video");
    }

    await video.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Video deleted successfully"
        )
    );
});

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this video");
    }

    video.isPublished = !video.isPublished;

    await video.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(
            200,
            video,
            "Publish status updated successfully"
        )
    );
});

export {
    publishAVideo,
    getAllVideos,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
};