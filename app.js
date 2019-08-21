const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authRouter = require("./auth");
const apiRouter = require("./routes");
const cors = require("cors");

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./database");
const sessionStore = new SequelizeStore({ db });

const app = express();

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  }
  catch (err) {
    done(err);
  }
});

const syncDb = async () => {
  await db.sync({ force: true });
}

const configureApp = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

  /*
  
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });

  */

  app.use(
    session({
      secret: "a super secretive secret key string to encrypt and sign the cookie",
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/auth", authRouter);
  app.use("/api", apiRouter);
}

const startListening = () => {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!!!`);
  })
}

const bootApp = async () => {
  await sessionStore.sync();
  await syncDb();
  await configureApp();
  await startListening();
}

bootApp();