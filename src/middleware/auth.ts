import { NextFunction, Request, Response } from "express"

export const auth = () => {
    return async (req : Request, res : Response, next : NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            throw new Error("You're not authorized")
        }
        next()
    }
}