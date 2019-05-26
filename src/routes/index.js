import {
  Router
} from 'express';
import {
  NotFound
} from 'http-errors';
import userRouter from './user';
import itemRouter from './item';

const router = Router();

//
// ─── API ROUTES ──────────────────────────────────────────────────────
//
// router.get('/', (req, res) => res.status(200).send('express-es2017-starter'));
router.use('/user', userRouter)
router.use('/', itemRouter)
//
// ─── 404 ERROR HANDLING ───────────────────────────────────────────────────────────────
//
router.use((req, res, next) => {
  const err = new NotFound('This route does not exist.');

  next(err);
});

module.exports = router;
