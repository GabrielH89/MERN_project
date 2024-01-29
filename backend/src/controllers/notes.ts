import { Request, RequestHandler, Response } from 'express';
import NoteModel from '../models/note';
import createHttpError from 'http-errors';
import { NextFunction } from 'express-serve-static-core'; 

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