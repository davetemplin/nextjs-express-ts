import * as fs from 'fs';

export default function () {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && process.platform === 'win32')
        process.env.GOOGLE_APPLICATION_CREDENTIALS = 'c:\\ps-colossus.json';

    if (process.env.GOOGLE_APPLICATION_CREDENTIALS && !fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
        console.error(`${process.env.GOOGLE_APPLICATION_CREDENTIALS} not found`);
        process.exit(1);
    }
}