import * as jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express';
import { users } from './data';
import { environment } from '../environments/environment'

/**
 * Middleware to grab accessToken jwt from request headers or cookie, verify it, and put
 * the user and accessToken in the request under req.user and req.jwt
 */
export function parseAccessToken(req: Request, res: Response, next: NextFunction) {
    // Now the accessToken can come from both the authorization header or the 'jwt' cookie
    const accessToken =
        req.headers.authorization?.split(' ')[1]
        || req.cookies?.['jwt']

    if (!accessToken) {
        next()
        return
    };

    jwt.verify(accessToken, environment.serverSecret, (err, decoded: any) => {
        if (err || !decoded.username) {
            next()
            return
        }

        (req as any)['user'] = users.find(u => u.username === decoded.username);
        (req as any)['jwt'] = accessToken

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
