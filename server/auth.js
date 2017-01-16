const app = require('APP'), {env} = app

const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport')

const User = require('APP/db/models/user')
const OAuth = require('APP/db/models/oauth')
const auth = require('express').Router()


/*************************
 * Auth strategies
 *
 * The OAuth model knows how to configure Passport middleware.
 * To enable an auth strategy, ensure that the appropriate
 * environment variables are set.
 *
 * You can do it on the command line:
 *
 *   FACEBOOK_CLIENT_ID=abcd FACEBOOK_CLIENT_SECRET=1234 npm start
 *
 * Or, better, you can create a ~/.$your_app_name.env.json file in
 * your home directory, and set them in there:
 *
 * {
 *   FACEBOOK_CLIENT_ID: 'abcd',
 *   FACEBOOK_CLIENT_SECRET: '1234',
 * }
 *
 * Concentrating your secrets this way will make it less likely that you
 * accidentally push them to Github, for example.
 *
 * When you deploy to production, you'll need to set up these environment
 * variables with your hosting provider.
 **/

// Facebook needs the FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET
// environment variables.

// ********************CONFIGURE OAUTH STRATEGIES*********************

// OAuth#setupStrategy is a class method belonging to the model OAuth. It
// takes config info and configures Passport for that particular strategy
// by feeding the info into Passport.use (similar to the local strategy setup
 // below)

OAuth.setupStrategy({
  provider: 'facebook',
  strategy: require('passport-facebook').Strategy,
  config: {
    clientID: env.FACEBOOK_CLIENT_ID,
    clientSecret: env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `http://localhost:1337/api/auth/login/facebook`,
  },
  passport
})

// Google needs the GOOGLE_CONSUMER_SECRET AND GOOGLE_CONSUMER_KEY
// environment variables.
OAuth.setupStrategy({
  provider: 'google',
  strategy: require('passport-google-oauth').Strategy,
  config: {
    consumerKey: env.GOOGLE_CONSUMER_KEY,
    consumerSecret: env.GOOGLE_CONSUMER_SECRET,
    callbackURL: `${app.rootUrl}/api/auth/login/google`,
  },
  passport
})

// Github needs the GITHUB_CLIENT_ID AND GITHUB_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'github',
  strategy: require('passport-github2').Strategy,
  config: {
    clientID: env.GITHUB_CLIENT_ID,
    clientSecrets: env.GITHUB_CLIENT_SECRET,
    callbackURL: `${app.rootUrl}/api/auth/login/github`,
  },
  passport
})

// ********************CONFIGURE PASSPORT SERIALIZE/DESERIALZE METHODS*********************
// Serialize user occurs once, on authentication/login. e.g. If local strategy
// below authenticates, it returns the user object, which is then passed to Passport's
// 'login' function (attached to request as req.login) which in turn passes it to serializeUser.  This
// sets cookie on user's browser (req.session.passport.user) with serialzed user info for future requests.
// On subsequent requests, Passport.session() middleware (invoked on every request)
// passes serialized user info (if present) to 'deserializeUser', which retrieves
// user object from database and attaches it to request as req.user

passport.serializeUser((user, done) => {
  debug('will serialize user.id=%d', user.id)
  done(null, user.id)
  debug('did serialize user.id=%d', user.id)
})

passport.deserializeUser(
  (id, done) => {
    debug('will deserialize user.id=%d', id)
    User.findById(id)
      .then(user => {
        debug('deserialize did ok user.id=%d', user.id)
        done(null, user)
      })
      .catch(err => {
        debug('deserialize did fail err=%s', err)
        done(err)
      })
  }
)

// ********************CONFIGURE LOCAL STRATEGY*********************

// The local strategy looks up user (User.findOne) by email, then
// uses the User instance method 'authenticate(plaintext)', which hashes
// the plaintext password (with bcrypt) and compares is to the user.password_digest
// field stored in the database. If they are the same, it invokes and returns 'done'
// with the user object.

passport.use(new (require('passport-local').Strategy) (
  (email, password, done) => {
    debug('will authenticate user(email: "%s")', email)
    User.findOne({where: {email}})
      .then(user => {
        if (!user) {
          debug('authenticate user(email: "%s") did fail: no such user', email)
          return done(null, false, { message: 'Login incorrect' })
        }
        return user.authenticate(password)
          .then(ok => {
            if (!ok) {
              debug('authenticate user(email: "%s") did fail: bad password')
              return done(null, false, { message: 'Login incorrect' })
            }
            debug('authenticate user(email: "%s") did ok: user.id=%d', user.id)
            done(null, user)
          })
      })
      .catch(done)
  }
))

// ********************ROUTES*********************

auth.get('/whoami', (req, res) => res.send(req.user))

auth.get('/:strategy/login', (req, res, next) =>{
  console.log('REQ', req.user)

  return passport.authenticate(req.params.strategy, {
    successRedirect: '/',
    failureRedirect: '/error'
  })(req, res, next)}
)

auth.post('/:strategy/login', (req, res, next) =>{

  console.log('REQ', req.user)
  return passport.authenticate(req.params.strategy, {
    successRedirect: '/',
    failureRedirect: '/'
  })(req, res, next)}
)

auth.post('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/api/auth/whoami')
})

module.exports = auth
