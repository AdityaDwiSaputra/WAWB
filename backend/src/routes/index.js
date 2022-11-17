import { Router } from "express";
import * as Middleware from "../middlewares/middleware.js";
import * as UserController from '../controllers/UserController.js';
import * as PostController from '../controllers/PostController.js';
import * as PermohonanController from '../controllers/PermohonanController.js';
import * as DashboardController from '../controllers/DashboardController.js';

const router = Router();

// auth
router.post('/api/v1/register', UserController.register);
router.post('/api/v1/login', UserController.login);
router.get('/api/v1/logout', Middleware.isAuthenticated, UserController.logout);

//dashboard
router.get('/api/v1/dashboard', Middleware.isAuthenticated, DashboardController.getDashboard);

//crud User
router.get('/api/v1/users/', Middleware.isAuthenticated, UserController.getAllUser);
router.get('/api/v1/users/:id', Middleware.isAuthenticated, UserController.detailUser);
router.post('/api/v1/users/', [Middleware.isAuthenticated, Middleware.uploads], UserController.createUser);
router.patch('/api/v1/users/:id', [Middleware.isAuthenticated, Middleware.uploads], UserController.updateUser);
router.delete('/api/v1/users/:id', Middleware.isAuthenticated, UserController.deleteUser);

//crud Permohonan
router.get('/api/v1/requests/', Middleware.isAuthenticated, PermohonanController.getAllPermohonan);
router.get('/api/v1/requests/:id', Middleware.isAuthenticated, PermohonanController.detailPermohonan);
router.post('/api/v1/requests/', Middleware.isAuthenticated, PermohonanController.createPermohonan);
router.patch('/api/v1/requests/:id', Middleware.isAuthenticated, PermohonanController.updatePermohonan);
router.delete('/api/v1/requests/:id', Middleware.isAuthenticated, PermohonanController.deletePermohonan);

//crud Post
router.get('/api/v1/posts/', Middleware.isAuthenticated, PostController.getAllPost);
router.get('/api/v1/posts/:id', Middleware.isAuthenticated, PostController.detailPost);
router.post('/api/v1/posts/', [Middleware.isAuthenticated, Middleware.uploads], PostController.createPost);
router.patch('/api/v1/posts/:id', [Middleware.isAuthenticated, Middleware.uploads], PostController.updatePost);
router.delete('/api/v1/posts/:id', Middleware.isAuthenticated, PostController.deletePost);


export default router;