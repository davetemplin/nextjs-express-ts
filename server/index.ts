import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as next from 'next';
import { parse as parseUrl } from 'url';

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextapp = next({ dev });
const nexthandler = nextapp.getRequestHandler();

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('*', (req, res) => {
    console.log(req.url);
    const { pathname, query } = parseUrl(req.url, true);
    if (pathname === '/a') {
        nextapp.render(req, res, '/a', query);
    } else if (pathname === '/b') {
        nextapp.render(req, res, '/b', query);
    } else if (pathname === '/c') {
        res.end('c');
    } else {
        nexthandler(req, res, parseUrl(req.url, true));
    }
});

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