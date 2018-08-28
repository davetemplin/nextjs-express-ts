import * as express from 'express';
import { parse as parseUrl } from 'url';
import nextapp from '../../nextapp';

const router = express.Router();
const handler = nextapp.getRequestHandler();

router.get('/*', (req, res) => {
    const { pathname, query } = parseUrl(req.url, true);
    if (pathname === 'a' || pathname === 'b')
        nextapp.render(req, res, pathname, query);
    else
        handler(req, res, parseUrl(req.url, true));
});

export default router;