/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 * 
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using 
 * the POST /token endpoint
 * 
 * Please include in this file all your private URL endpoints.
 * 
 */

import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';

// declare a new router to include all the endpoints
const router = Router();

router.get('/users', safe(actions.getUsers));
router.get('/todos', safe(actions.getTodos));
router.get('/users/:id', safe(actions.getUserId));
router.delete('/users/:id', safe(actions.delUserId));
router.put('/users/:id', safe(actions.updUserId));
router.delete('/todos/:id', safe(actions.delTodoId));
export default router;
