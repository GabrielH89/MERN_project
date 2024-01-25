import { Request, RequestHandler, Response } from 'express';
import NoteModel from '../models/note';

export const getNotes: RequestHandler = async (req: Request, res: Response, next) => {
    try { 
        const notes = await NoteModel.find().exec();
        res.status(200).json({ notes });
    } catch (error) {
        next(error);
    }
};

export const getNoteById: RequestHandler = async (req: Request, res: Response, next) => {
    const id = req.params.id;

    try { 
        const note = await NoteModel.findById(id).exec();
        res.status(200).json({note});
    } catch (error) {
        next(error);
    }
};


export const createNotes: RequestHandler = async (req: Request, res: Response, next) => {
    const { title, text } = req.body;
    try { 
        const newNote = await NoteModel.create({
            title: title,
            text: text,
        })
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

