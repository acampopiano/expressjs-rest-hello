import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Todos } from './entities/Todos'
import { Exception } from './utils'

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.first_name) throw new Exception("Please provide a first_name")
    if (!req.body.last_name) throw new Exception("Please provide a last_name")
    if (!req.body.email) throw new Exception("Please provide an email")
    if (!req.body.password) throw new Exception("Please provide a password")

    const userRepo = getRepository(User)
    // fetch for any user with this email
    const user = await userRepo.findOne({ where: { email: req.body.email } })
    if (user) throw new Exception("User already exists with this email")

    const newUser = getRepository(User).create(req.body);  //Creo un usuario
    const results = await getRepository(User).save(newUser); //Grabo el nuevo usuario 
    return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(User).find();
    return res.json(users);
}

export const createTodo = async (req: Request, res: Response): Promise<Response> => {
    const userRepo = getRepository(User)
    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.description) throw new Exception("Please provide a description for todo")
    if (!req.body.done) throw new Exception("Please provide if todo is done")
    if (!req.body.user_id) throw new Exception("Please provide an user for todo list")

    const user = await userRepo.findOne(req.body.user_id)
    if (!user) throw new Exception("User does not exist with this id")

    const newTodo = getRepository(Todos).create({ ...req.body, user: user });  //Creo una todo
    const results = await getRepository(Todos).save(newTodo); //Grabo la todo    
    return res.json(results);
}

export const getTodos = async (req: Request, res: Response): Promise<Response> => {
    const todos = await getRepository(Todos)
        .find({ relations: ["user"] });

    return res.json(todos);
}

export const getUserId = async (req: Request, res: Response): Promise<Response> => {
    const userRepo = getRepository(User)
    const user = await userRepo.findOne(req.params.id)
    if (!user) throw new Exception("User does not exist")
    return res.json(user);
}

export const delUserId = async (req: Request, res: Response): Promise<Response> => {
    const userRepo = getRepository(User)
    const user = await userRepo.findOne(req.params.id)
    if (!user) throw new Exception("User does not exist")
    const results = await getRepository(User).delete(user)
        .then(() => {
            let whiteSpace = " ";
            let response = {
                message: "User " + user.first_name.concat(whiteSpace, user.last_name) + " deleted",
                state: true
            }
            return res.json(response);
        })
    return res.json(results);
}

export const updUserId = async (req: Request, res: Response): Promise<Response> => {
    const userRepo = getRepository(User)
    const user = await userRepo.findOne(req.params.id)
    if (!user) throw new Exception("User does not exist")

    if (!req.body.first_name) throw new Exception("Please provide a first_name")
    if (!req.body.last_name) throw new Exception("Please provide a last_name")
    if (!req.body.email) throw new Exception("Please provide an email")
    if (!req.body.password) throw new Exception("Please provide a password")

    const results = await userRepo.update(user, req.body)
        .then(() => {
            let response = {
                message: "User updated!",
                state: true
            }
            return res.json(response);
        })
    return res.json(user);
}

export const delTodoId = async (req: Request, res: Response): Promise<Response> => {    
    const userRepo = getRepository(User)
    const user = await userRepo.findOne(req.params.userid)
    if (!user) throw new Exception("User does not exist")

    const todoRepo = getRepository(Todos)
    const todo = await todoRepo.find({relations: ["user"], where: { user: req.params.userid,todo_id: req.params.todoid}})
    if (!todo.length) throw new Exception("Todo does not exist")
    
    const results = todoRepo.remove(todo)
        .then(() => {            
            let response = {
                message: "Todo deleted",
                state: true
            }
            return res.json(response);
        })
    return res.json(results);
}