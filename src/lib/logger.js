import pino from 'pino';
import pinoCaller from 'pino-caller';
import pretty from 'pino-pretty';
import fs from 'fs';
import path from 'path';

const logDir = path.resolve('logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const date = new Date().toISOString().slice(0, 10);
const filePath = path.join(logDir, `${date}.log`);

const prettyFileStream = pretty({
  colorize: false,
  translateTime: 'yyyy-mm-dd HH:MM:ss',
  ignore: 'pid,hostname',
});

const fileStream = fs.createWriteStream(filePath, { flags: 'a' });
prettyFileStream.pipe(fileStream);

const prettyConsoleStream = pretty({
  colorize: true,
  translateTime: 'yyyy-mm-dd HH:MM:ss',
  ignore: 'pid,hostname',
});

const streams = [
  { stream: prettyConsoleStream },
  { stream: prettyFileStream },
];

const baseLogger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
}, pino.multistream(streams));

export const logger = pinoCaller(baseLogger);
