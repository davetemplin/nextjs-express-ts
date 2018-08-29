import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as routes from './routes';
import nextapp from './nextapp';

import checkEnv from './lib/checkEnv';
checkEnv();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', routes.api);
app.use('/', routes.app);

(async () => {
    try {
        await nextapp.prepare();
        app.listen(port);
        console.log(`server listening on port ${port}`);
    }
    catch (err) {
        console.error(err.message);
    }
})();