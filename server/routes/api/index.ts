import * as express from 'express';
import * as test from '../../lib/test';

const router = express.Router();

router.get('/', (req, res) => res.json({ok: true}));
router.get('/test1', (req, res) => res.json({result: test.test1()}));
router.get('/test2', async (req, res) => res.json({result: await test.test2()}));

export default router;