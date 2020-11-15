import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import path from 'path'
import { users } from './data'
import { User } from './interfaces/user.interface'


const SERVER_SECRET = '2728iudskjcçapodw72'

const app = express()

app.use('/static', express.static(path.join(__dirname, '../public')))
app.use(bodyParser.json())


app.get('/api/users', (req, res) => {
    res.json(
        users.map(hideUserPrivateFields)
    )
})

app.get('/api/users/:username', parseAccessToken, (req, res) => {
    const queryUsername = req.params['username']
    const user = (req as any)['user']

    if (!queryUsername) {
        res.status(400).send('No username in request')
        return
    }

    // User is querying himself
    if (user && user === queryUsername) {
        res.json(
            users.find(u => u.username === user)
        )
        return
    }

    res.json(
        hideUserPrivateFields(
            users
                .find(u => u.username === queryUsername)
        )
    )
})

app.post('/api/login', (req, res) => {
    const { username, password } = req.body

    if (typeof username !== 'string') {
        res.status(400).send('No username on request')
        return
    }

    if (typeof password !== 'string') {
        res.status(400).send('No password on request')
        return
    }

    const user = users.find(u => u.username === username)

    if (!user) {
        res.status(400).send('User not found')
        return
    }

    if (user.password !== password) {
        res.status(400).send('Wrong password')
        return
    }

    // Make a JWT with username as payload, and sign it with server secret
    const accessToken = jwt.sign(
        {
            username
        },
        SERVER_SECRET
    )

    // Send the token as json
    res.json({ accessToken })
})

app.listen(3000, () => {
    console.log("Server started in http://localhost:3000/")
})



function hideUserPrivateFields(u: User) {
    delete u.password;
    return u
}

/**
 * Middleware to grab accessToken jwt from request headers, verify it, and put
 * the username in the request
 */
function parseAccessToken(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
        next()
        return
    };

    jwt.verify(accessToken, SERVER_SECRET, (err, decoded: any) => {
        if (err || !decoded.username) {
            next()
            return
        }

        (req as any)['user'] = decoded.username
        next()
    });
}
