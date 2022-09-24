import { DateTimeFormatter, LocalDateTime, ZoneId } from '@js-joda/core';
import winston from 'winston';
import { appConfigService } from '../../config/app/config.service';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const customLevels = {
  error: 0,
  warn: 1,
  notice: 2,
  info: 3,
  debug: 4,
};

const customColor = {
  error: 'red',
  warn: 'yellow',
  notice: 'blue',
  info: 'green',
  debug: 'gray',
};

winston.addColors(customColor);

export const logger = winston.createLogger({
  levels: customLevels,
  format: winston.format.combine(
    enumerateErrorFormat(),
    appConfigService.isDevelopment() ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(
      ({ level, message }) =>
        `${level}: ${LocalDateTime.now(ZoneId.UTC).format(DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss'))} ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
      level: appConfigService.isDevelopment() ? 'debug' : 'info',
    }),
  ],
});
