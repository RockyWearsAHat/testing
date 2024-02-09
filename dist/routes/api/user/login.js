import express from 'express';
import User from '../../../db/models/users.js';
const loginRouter = express.Router();
loginRouter.post('/', async (req, res) => {
    console.log('Running post to /api/user/login');
    //If no email and no username param on body
    if (!req.body.email && !req.body.username) {
        res.status(200).json({ error: 'Please pass an email or a username' });
        return;
    }
    let foundUser;
    //If email/username is email
    if ((req.body.email && req.body.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) ||
        (req.body.username && req.body.username.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))) {
        //Try to find by email
        foundUser = await User.findOne({ where: { email: req.body.email ? req.body.email : req.body.username } });
    }
    //If username/email is not email
    else if ((req.body.username && !req.body.username.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) ||
        (req.body.email && !req.body.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))) {
        //Try to find by username
        foundUser = await User.findOne({ where: { username: req.body.username ? req.body.username : req.body.email } });
    }
    //Try to validate the passed password and the user password of the found user
    try {
        if (!foundUser)
            //Throw error if unable to find user
            throw new Error(`Unable to find a user with ${req.body.username ? 'username ' + req.body.username : 'email ' + req.body.email}!`);
        //If the passwords match
        if (foundUser.validatePassword(req.body.password)) {
            //Get the user data without the hashed password
            let { password, createdAt, updatedAt, ...userWithoutPass } = foundUser.dataValues;
            //Set session user data to the userWithoutPass
            req.session.user = userWithoutPass;
            //Save the session so it can be accessed in server.ts
            req.session.save((err) => {
                if (err)
                    console.log(err);
            });
            //Return the status that the user was logged in
            res.status(200).json({ status: 'Logged in user!' });
            return;
        }
        //Passwords do not match
        else {
            //Return status that user cannot log in
            res.status(200).json({ error: 'Unable to login user, incorrect password' });
            return;
        }
    }
    catch (err) {
        //If any errors in above block retrun error back to user
        res.status(200).json({ error: err.message });
        return;
    }
});
loginRouter.get('/test', (req, res) => {
    console.log('get req');
    res.send('Test res');
});
export default loginRouter;
//# sourceMappingURL=login.js.map