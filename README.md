# Angular SSR + Auth

## The problem
A typical web app that uses Json Web Tokens for authentication stores this JWT on localStorage after user login. This token is appended to requests the app makes to the server, usually in the header 'Authorizarion: Bearer ...'. This way the server knows who is making the request.

Server side rendering responds to route requests (eg. http://yourapp.com/home) with first a fully rendered html page, then followed by the more lenghty JS that makes the app functional, with the goal of showing the user content more rapidly.

A route request, made by your browser, is a plain http/s GET. Anything stored in localStorage is not sent in this first request, and the server doesen't know who is requesting that route.

If the route is private (requires the user to be logged in) it cannot not be rendered on the server, causing that first render to be a login page or home page or a '401 Unauthorized', even though the user is logged in.

## The solution 🍪

Upon login, save a cookie with the user's authentication JWT.

That http GET made by your browser when visiting a webpage does not send the localStorage, but it does send all cookies set for that domain, including the authentication JWT.

Like this, the server knows who is requesting the route, and can render the app accordingly.

## Running
`npm start`

This will start a live dev server on `http://localhost:4200`.
To disable SSR, go to `src/server/server.ts` and set `USE_SSR` to false.

To see SSR in action, on chrome: 
Open dev tools > network > click the dropdown that says Online (top right) and select Fast 3G.
Compare the page load with SSR ON and OFF.

You can also see how a naive implementation of SSR behaves by going checking out the `MILESTONE: SSR without auth` commit. 
Login, go to /movies and refresh the page. You should see the page flicker as it shows first the homepage and only later the /movies page.


