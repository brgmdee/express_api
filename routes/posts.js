 const express  = require("express");

 const postsController = require('../controllers/post.controller');

 const checkAuthMiddleware = require('../middleware/check-auth')


 const router = express.Router();

 router.get('/', checkAuthMiddleware.checkAuth, postsController.index);
 router.post('/', checkAuthMiddleware.checkAuth, postsController.save);
 router.get('/:id', checkAuthMiddleware.checkAuth, postsController.show);
 router.patch('/:id', checkAuthMiddleware.checkAuth, postsController.update);
 router.delete('/:id', checkAuthMiddleware.checkAuth, postsController.destroy);

 module.exports = router