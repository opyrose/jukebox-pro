const express = require("express");
const router = require("Router");
const app = express();

const { authenticate } = require("./auth");
const prisma = require("../prisma");

router.get("/", authenticate, async (req, res, next) => {
    try {
        const tracks = await prisma.track.findMany();
        res.json(tracks);
    } catch (e) {
        next(e);
    }
});

router.get("/:id", authenticate, async (req, res, next) => {
    const includePlaylists = req.user
        ? { where: { ownerId: req.user, id } }
        : false;
    try {
        const track = await prisma.track.findUniqueOrThrow({
            where: { id: +id },
            include: { playlists: includePlaylists },
        });
        res.json(track);
    } catch (e) {
        next(e);
    }
});