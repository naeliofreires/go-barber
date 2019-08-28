import { Router } from 'express';
import multer from 'multer';
import configMulter from './config/multer';

// controller
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';

// middleware
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(configMulter);

routes.get('/', (req, res) => res.json({ online: true }));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/providers', ProviderController.index);

routes.use(authMiddleware); // irá valer apenas p/ rotas declaradas depois dessa linha

routes.put('/users', UserController.update);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
