import express from 'express';
import { verifyJWT } from './middlewares/ValidateToken';
import { CreateUserController } from './modules/createUser/CreateUserController';
import { ListUsersController } from './modules/ListUsers/ListUsersController';
import { LoginController } from './modules/Login/LoginController';

export const routes = express.Router();

routes.get('/users', verifyJWT, new ListUsersController().handle);

routes.post('/user', new CreateUserController().handle);

routes.post('/login', new LoginController().handle);
