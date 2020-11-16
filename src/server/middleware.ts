import * as jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express';
import { users } from './data';
import { environment } from '../environments/environment'

/**
 * Middleware to grab accessToken jwt from request headers, verify it, and put
 * the username in the request
 */
export function parseAccessToken(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
        next()
        return
    };

    jwt.verify(accessToken, environment.serverSecret, (err, decoded: any) => {
        if (err || !decoded.username) {
            next()
            return
        }

        (req as any)['user'] = users.find(u => u.username === decoded.username)
        next()
    });
}

export function onlyAllowAuthenticatedUsers(req: Request, res: Response, next: NextFunction) {
    if (req['user']) {
        next()
    } else {
        res.sendStatus(401)
    }
}
