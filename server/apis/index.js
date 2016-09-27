import { Router } from 'express';

let router = new Router();

router.post('/ajax', function(req, res, next){
    if(error) {
        next();
    } else {
        res.send('test')
    }
});

export default router;


