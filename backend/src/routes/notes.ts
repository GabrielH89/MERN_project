import express from 'express';
import * as NotesController from '../controllers/notes';

const router = express.Router();

router.get("/", NotesController.getNotes);
router.get("/:id", NotesController.getNoteById); 
router.post("/", NotesController.createNote);
router.put("/:id", NotesController.updateNoteById);
router.delete("/", NotesController.deleteNotes);
router.delete("/:id", NotesController.deleteNoteById);

export default router;
