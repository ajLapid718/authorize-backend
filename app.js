const express = require("express");
const session = require("express-session");
const passport = require("passport");

const SequelizeStore = require("connect-session-sequelize"(session.Store));
const db = require("./database");
const sessionStore = new SequelizeStore({ db });