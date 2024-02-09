import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import colorWrap from './helpers/colorText.js';
import express from 'express';
import sequelize from './db/dbHandler.js';
import masterRouter from './routes/router.js';
import session from 'express-session';
import User from './db/models/users.js';
import Artist from './db/models/artists.js';
const app = express();
//Add static paths for pages so the references inside of the pages can link to the files
app.use(express.static(path.join(process.cwd(), 'src')));
app.use(express.static(path.join(process.cwd(), 'src/pages/Home')));
app.use(express.static(path.join(process.cwd(), 'src/pages/Login')));
app.use(express.static(path.join(process.cwd(), 'src/pages/Logout')));
app.use(express.static(path.join(process.cwd(), 'src/pages/Register')));
//Include compiled typescript files for the HTML pages
app.use(express.static(path.join(process.cwd(), 'dist/pages/Home')));
app.use(express.static(path.join(process.cwd(), 'dist/pages/Login')));
app.use(express.static(path.join(process.cwd(), 'dist/pages/Logout')));
app.use(express.static(path.join(process.cwd(), 'dist/pages/Register')));
//Use body parser or sum
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Sync the tables
try {
    User.belongsTo(Artist);
    Artist.hasOne(User, { onDelete: 'CASCADE', foreignKey: 'artistId' });
    await sequelize.sync({ force: true });
    console.log(colorWrap(100, 100, 145, 'Synced database models'));
}
catch (err) {
    console.log(err);
}
//Middleware to remove final slash from display URL
app.use((req, res, next) => {
    if (req.path.slice(-1) === '/' && req.path.length > 1) {
        const query = req.url.slice(req.path.length);
        const safepath = req.path.slice(0, -1).replace(/\/+/g, '/');
        res.redirect(301, safepath + query);
    }
    else {
        next();
    }
});
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
}));
//Use external routes, not serving pages
app.use(masterRouter);
//Send homepage
app.get(['/', '/home'], (req, res) => {
    console.log(req.session);
    res.sendFile('/home.html', { root: 'src/pages/Home' });
});
//Login
app.get('/login', (req, res) => {
    res.sendFile('/login.html', { root: 'src/pages/Login' });
});
//Register
app.get('/register', (req, res) => {
    res.sendFile('/register.html', { root: 'src/pages/Register' });
});
//Logout
app.get('/logout', (req, res) => {
    res.sendFile('/logout.html', { root: 'src/pages/Logout' });
});
//Start app
app.listen(process.env.PORT || 3000, () => {
    console.log(colorWrap(100, 200, 200, `Server running on http://localhost:3000`));
});
//# sourceMappingURL=server.js.map