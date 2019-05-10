import httpStatus from 'http-status';

export default function auth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.sendStatus(httpStatus.FORBIDDEN);
}
