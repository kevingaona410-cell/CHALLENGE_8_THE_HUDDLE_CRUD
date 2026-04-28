const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topic_controller");

// Rutas de los topics
router.get("/", topicController.getAllTopics);
router.post("/", topicController.createTopic);
router.post("/topics/:id/vote", topicController.voteTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);

router.post("/topics/:id/links", topicController.addLink);
router.post("/topics/:id/links/:linkId/delete", topicController.deleteLink);


module.exports = router;