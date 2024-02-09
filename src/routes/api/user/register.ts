import express, { Request, Response } from 'express';
import containsSemicolons from '../../../helpers/checkSqlStrings.js';
import User from '../../../db/models/users.js';

const registerRouter = express.Router();

registerRouter.post('/', async (req: Request, res: Response) => {
  //Ensure required properties are passed on body
  if (!req.body.username) {
    res.status(500).json({ error: 'Username is required' });
    return;
  }
  if (!req.body.email) {
    res.status(500).json({ error: 'Email is required' });
    return;
  }
  if (!req.body.password) {
    res.status(500).json({ error: 'Password is required' });
    return;
  }
  if (!req.body.firstName) {
    res.status(500).json({ error: 'First name is required' });
    return;
  }
  if (!req.body.lastName) {
    res.status(500).json({ error: 'Last name is required' });
    return;
  }

  if (containsSemicolons(req.body)) {
    res.status(500).json({ error: 'Invalid characters' });
    return;
  }

  if (!req.body.username.match(/^[a-zA-Z0-9!@#$%^&*]*$/)) {
    //Check username is only a-z A-Z 0-9!@#$%^&*
    res.status(500).json({ error: 'Username may only contain characters A-z, numbers, and symbols' });
    return;
  }

  //Check email is a valid email
  if (!req.body.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
    res.status(500).json({ error: 'Email is not a valid email' });
    return;
  }

  //Check password is only a-z A-Z 0-9!@#$%^&*
  if (!req.body.password.match(/^[a-zA-Z0-9!@#$%^&*]*$/)) {
    res.status(500).json({ error: 'Password may only contain characters A-z, numbers, and symbols' });
    return;
  }

  //If no display name, set display name to the username, else set displayName to the req.body
  let displayName = '';
  if (!req.body.displayName) displayName = req.body.username;
  else {
    displayName = req.body.displayName;
  }

  try {
    let createRes = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      displayName,
    });
    res.status(200).json({ status: 'Created user!', createRes });
    return;
  } catch (err) {
    res.status(500).json({ error: err.message.split('\n').pop() });
    return;
  }
});

export default registerRouter;
