import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import { join } from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as jwt from 'jsonwebtoken'

import { AppServerModule } from '../main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import { movies, users } from './data';
import { environment } from '../environments/environment'
import { parseAccessToken, onlyAllowAuthenticatedUsers } from './middleware';



export function app(): express.Express {
  const app = express();
  const distFolder = join(process.cwd(), 'dist/angular-ssr-auth/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index.html';

  // Set localStorage to undefined
  global['localStorage'] = undefined

  app.use('/static', express.static(join(process.cwd(), 'public')))
  app.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));
  app.use(bodyParser.json())
  app.use(cors())
  app.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));
  app.set('view engine', 'html');
  app.set('views', distFolder);

  // Api routes
  app.get('/api/users', (req, res) => {
    res.json(
      users
    )
  })

  app.get('/api/users/:username', (req, res) => {
    const queryUsername = req.params['username']

    if (!queryUsername) {
      res.status(400).send('No username in request')
      return
    }

    res.json(
      users
        .find(u => u.username === queryUsername)
    )
  })

  app.get('/api/movies', parseAccessToken, onlyAllowAuthenticatedUsers, (req, res) => {
    res.json(
      movies
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
      environment.serverSecret
    )

    // Send the token as json
    res.json({ user, accessToken })
  })



  // All regular routes use the Universal engine
  app.get('*', (req, res) => {
    const useSSR = false
    if (useSSR) {
      res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
    } else {
      res.sendFile(join(distFolder, indexHtml))
    }
  });

  return app;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from '../main.server';

