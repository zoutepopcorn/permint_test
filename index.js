const SECRET = `page`;
const PORT = 3000;

import {
  Bearer,
  Basic
} from 'permit'
import express from 'express'

const permit = new Basic({
  query: ['username', 'password'],
})

const getToken = () => {
  return Math.random().toString(36).substring(7);
}

const authenticate = (req, res, next) => {
  const token = permit.check(req)

  if (!token) {
    // res.end("no login")
    console.log("oops");
    permit.fail(res);
    return next();

  } else {
    console.log("ELSE ");
    const USER = token[0];
    const PASS = token[1];
    if (USER == 'admin') {
      // res.end(`${USER}`);
      const token = getToken();
      req.token = getToken();
      req.user = USER;
      next()
    } else {
      res.end('whoops');
    }
    console.log(`=> ${USER} - ${PASS}`);
  }

  // Perform your authentication logic however you'd like...
  // db.users.findByToken(token, (err, user) => {
  //   if (err) return next(err)
  //
  //   // No user found, so their token was invalid.
  //   if (!user) {
  //     permit.fail(res)
  //     return next(new Error(`Authentication invalid!`))
  //   }
  //
  //   // Authentication succeeded, save the context and proceed...
  //   req.user = user
  //   next()
  // })
}





const app = express()

app.get('/', (req, res) => {
  res.send('')
})

app.get(`/li`, authenticate, (req, res) => {
  res.send('Restricted content!')
})

app.get(`/${SECRET}/reg`, authenticate, (req, res) => {
  res.send('Restricted content!')
})

app.get(`/pag`, authenticate, (req, res) => {
  res.send(` Restricted content ! ${req.token}`)
})


app.listen(PORT)