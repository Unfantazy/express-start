import { NextFunction, Response, Request } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.query.token

    if (!(token === '123')) {
        res.sendStatus(401)
        return
    }

    next()
}