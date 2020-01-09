import { Router } from 'express';

import UserController from './app/controller/UserController';
import StudentController from './app/controller/StudentController';
import SessionController from './app/controller/SessionController';
import PlanController from './app/controller/PlanController';
import RegistrationController from './app/controller/RegistrationController';
import CheckinController from './app/controller/CheckinController';
import HelpOrderController from './app/controller/HelpOrderController';
import HelpAnswerController from './app/controller/HelpAnswerController';
import TrainingController from './app/controller/TrainingController'

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

// SESSION
routes.post('/sessions', SessionController.store);
routes.post('/studentsession', SessionController.show);

// STUDENT CHECKIN
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

// STUDENT HELP ORDERS
routes.get('/students/:id/help-orders', HelpOrderController.index);
routes.post('/students/:id/help-orders', HelpOrderController.store);

// <<<<<<<<<<<<<<<<<<<<<<<<<<<< KEEP OUT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// AUTH middleware
routes.use(AuthMiddleware);

// TRAINING
routes.get('/training', TrainingController.show)
routes.post('/training-register', TrainingController.store)
routes.put('/training-update', TrainingController.update)
routes.delete('/training-delete', TrainingController.delete)

// USERS / Admin
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/', UserController.update);
routes.delete('/users/:id', UserController.delete);

// LIST ALL HELP ORDERS
routes.get('/help-orders', HelpOrderController.show);

// HELP ANSWERS
routes.get('/help-orders/answer', HelpAnswerController.index);
routes.get('/help-orders/:id/answer', HelpAnswerController.show);
routes.post('/help-orders/:id/answer', HelpAnswerController.store);

// STUDENTS
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

// PLANS
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

// REGISTRATION
routes.get('/registration/', RegistrationController.show);
routes.get('/registration/:id', RegistrationController.index);
routes.post('/registration', RegistrationController.store);
routes.put('/registration/:id', RegistrationController.update);
routes.delete('/registration/:id', RegistrationController.delete);

export default routes;
