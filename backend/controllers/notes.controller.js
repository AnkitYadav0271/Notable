import NoteRepository from "../repositories/note.repository.js";
import { Note } from "../models/notes.model.js";

const noteRepo = new NoteRepository(Note);

export const addNote = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;
  if (!title) {
    return res.status(404).json({
      success: false,
      message: "title can't be empty",
    });
  }
  try {
    const note = await noteRepo.create({ title, description });
    note.owner = userId;
    await note.save();
    return res.status(200).json({
      success: true,
      message: "To do added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const note = await noteRepo.findById(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Notes not found",
      });
    }

    const result = await noteRepo.update(id, { title, description });

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "catch message" || error.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = noteRepo.findById(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "note can't be found",
      });
    }

    const result = await noteRepo.delete(id);
    console.log(result);

    return res.status(200).json({
      success: true,
      message: "note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getNote = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  try {
    const notes = await noteRepo.findByUser(userId);
    console.log(notes);
    return res.status(200).json({
      success: true,
      message: "note fetched successfully",
      notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
