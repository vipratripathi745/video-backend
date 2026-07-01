import { Router } from "express";
import {
    publishAVideo,
    getAllVideos,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/").get(getAllVideos);

router.route("/publish").post(
    verifyJWT,
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1,
        },
        {
            name: "thumbnail",
            maxCount: 1,
        },
    ]),
    publishAVideo
);

router.route("/toggle/publish/:videoId").patch(
    verifyJWT,
    togglePublishStatus
);

router.route("/:videoId")
    .get(getVideoById)
    .patch(
        verifyJWT,
        upload.single("thumbnail"),
        updateVideo
    )
    .delete(
        verifyJWT,
        deleteVideo
    );

export default router;