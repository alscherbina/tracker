import express from 'express';
import httpStatus from 'http-status';
import passport from '../configs/passport';

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  if (req.isAuthenticated()) {
    res.sendStatus(httpStatus.OK);
  } else {
    res.sendStatus(httpStatus.FORBIDDEN);
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  res.sendStatus(httpStatus.OK);
});

export default router;
