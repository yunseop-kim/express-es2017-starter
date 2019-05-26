import bodyParser from 'body-parser';
import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import expressErrorHandler from './utils/errorHandler';
import helmet from 'helmet';
import morgan from 'morgan';

import logger from './config/winston';
import router from './routes';

const {
  httpErrorHandler,
  handleServerError,
  axiosErrorParser,
  celebrateErrorParser
} = expressErrorHandler(logger);
import db from './db';
//
// ─── EXPRESS SERVER CREATION ────────────────────────────────────────────────────
//
const app = express();

//
// ─── EXPRESS CONFIGURATION ──────────────────────────────────────────────────────
//
app.use(
  morgan('dev', {
    stream: {
      write: message => logger.info(message),
    },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(helmet());
app.use(cors());

//
// ─── API DOCUMENTATION ──────────────────────────────────────────────────────────
//
app.use('/docs', express.static(`${__dirname}/docs`));
//
// ─── SERVER ROUTES ──────────────────────────────────────────────────────────────
//
app.use(router);

//
// ─── GLOBAL ERROR HANDLING ──────────────────────────────────────────────────────
//
app.use(axiosErrorParser);
app.use(celebrateErrorParser);
app.use(httpErrorHandler);

//
// ─── SERVER START ───────────────────────────────────────────────────────────────
//
const port = 8080;
db.initDB().then(() => {
  return db.createDummy();
}).then(() => {
  app
    .listen(port, () =>
      logger.info(
        `${chalk.green('✓')} App is running on port ${chalk.yellow(`${port}`)} in ${chalk.yellow(app.get('env'))} mode`
      )
    )
    .on('error', handleServerError);
})
