import express from 'express';
import User from '../../../db/models/users.js';
import Artist from '../../../db/models/artists.js';
const registerRouter = express.Router();
registerRouter.post('/', async (req, res) => {
    try {
        const foundUser = await User.findByPk(req.body.userId);
        if (!foundUser)
            throw new Error(`Unable to find user with id ${req.body.userId}`);
        console.log(req.body.userId);
        const artistCreationRes = await Artist.create();
        console.log(artistCreationRes);
        console.log(foundUser);
        console.log(foundUser.set('artistId', req.body.userId));
        res.json('Created Artist');
    }
    catch (err) {
        console.log(err);
        res.json('Unable to create artist profile');
    }
});
registerRouter.get('/', async (req, res) => {
    console.log(req.body.userId);
    const artistRes = await Artist.findAll({ raw: true });
    res.send(artistRes);
});
export default registerRouter;
//# sourceMappingURL=register.js.map