import * as express from 'express';
import * as data from '../../lib/data';

const router = express.Router();

router.get('/', (req, res) => res.json({ok: true}));
router.get('/data', async (req, res) => res.json({result: await data.test2()}));

export default router;