import { Request, RequestHandler, Response } from 'express';
import NoteModel from '../models/note';
import createHttpError from 'http-errors';
import { NextFunction } from 'express-serve-static-core'; 
import mongoose from 'mongoose';

export const getNotes: RequestHandler = async (req: Request, res: Response, next) => {
    try { 
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getNoteById: RequestHandler = async (req: Request, res: Response, next) => {
    const id = req.params.id;

    try { 
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(id).exec();
        if(!note){
            throw createHttpError(400, "Note not found");
        }

        res.status(200).json({note});
    } catch (error) {
        next(error);
    }
};

interface CreateNodeBody {
    title?: string,
    text? : string,
}

export const createNote: RequestHandler<{}, {}, CreateNodeBody, Record<string, any>> = async (req: Request<{}, {}, CreateNodeBody>, res: Response<Record<string, any>>, next: NextFunction) => {
    const { title, text } = req.body;
    try { 
        if(!title) {
            throw createHttpError(400, "Note must have a title");
        }
        const newNote = await NoteModel.create({
            title: title,
            text: text,
        });
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

export const updateNoteById: RequestHandler = async (req: Request, res: Response, next) => {
    const id = req.params.id;
    const newTitle = req.body.title;
    const newText = req.body.text;
    try{
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400, "Invalid note id");
        }

        if(!newTitle) {
            throw createHttpError(400, "Note must have a title");
        }

        const note = await NoteModel.findById(id);
        if(!note){
            throw createHttpError(400, "Note not found");
        }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();
        
        res.status(200).json(updatedNote);
    }catch(error){
        next(error);
    }
}


export const deleteNotes: RequestHandler = async (req: Request, res: Response, next) => {
    try{
        const notes = await NoteModel.find().exec();
        if(notes.length === 0){
            res.status(404).json({msg: "Datas not found"});
        }

        await NoteModel.deleteMany({});
        res.status(204).json({msg: "Datas deleted with success"});
    }catch(error){
        next(error);
    }
}

export const deleteNoteById: RequestHandler = async (req: Request, res: Response, next) => {
    const id = req.params.id;
    try{
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(id).exec();

        if(!note){
            throw createHttpError(400, "Note not found");
        }

        await note.deleteOne();

        res.status(204).json({msg: "Data deleted with success"});
    }catch(error){
        next(error);
    }
}


