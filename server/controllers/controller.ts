import { Request, Response } from 'express';
import getDataFromOpenAI from '../api'
import {db} from '../models/index'

export async function getDataFromAPI (req: Request, res: Response) {
    // TODO check if req.body has correct format
  try {
    const data = await getDataFromOpenAI(req.body);
    res.status(200)
    res.send(data);
} catch (err) {
    console.log('Error with getting data from API: ', err);
    res.sendStatus(500);
}
}

export async function postProject (req: Request, res: Response) {
  try {
    const newProject = req.body;
    console.log(newProject)
    const response = await db.create(newProject);
    console.log(response)
    res.status(201);
    res.send(response);
} catch (err) {
    console.log('err', err);
    res.sendStatus(500);
}
}

export async function getProjects (req: Request, res: Response) {
    try {
        const response = await db.find({});
        res.status(201);
        res.send(response);
    } catch (err) {
        console.log('err', err);
        res.status(500);
    }
}

export async function deleteProject (req: Request, res: Response) {
    console.log(req.body)
    try {
        const response = await db.deleteOne({id: req.body.id})
        console.log('deleted: ', response);
        res.status(201);
        res.send(response);
    } catch (error) {
        console.log('Error when deleting project from db: ', error)
    }
}

// await db.collection('inventory').deleteOne({ status: 'D' });

