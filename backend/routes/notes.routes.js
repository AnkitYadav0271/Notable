import { Router } from "express";
import { addNote, deleteNote, getNote, updateNote } from "../controllers/notes.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";

const router = Router({ mergeParams: true });
router.post("/add-note",isAuthenticated, addNote);
router.patch("/update-note/:id",isAuthenticated, updateNote);
router.delete("/destroy/:id",isAuthenticated,deleteNote);
router.get("/notes",getNote);

export default router;
