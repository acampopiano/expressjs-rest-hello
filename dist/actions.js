"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.delTodoId = exports.updTodoId = exports.updUserId = exports.delUserId = exports.getUserId = exports.getTodos = exports.createTodo = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var User_1 = require("./entities/User");
var Todos_1 = require("./entities/Todos");
var utils_1 = require("./utils");
var moment_1 = __importDefault(require("moment"));
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("User already exists with this email");
                newUser = typeorm_1.getRepository(User_1.User).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var createTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newTodo, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = typeorm_1.getRepository(User_1.User);
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.description)
                    throw new utils_1.Exception("Please provide a description for todo");
                if (!req.body.done)
                    throw new utils_1.Exception("Please provide if todo is done");
                if (!req.body.user_id)
                    throw new utils_1.Exception("Please provide an user for todo list");
                return [4 /*yield*/, userRepo.findOne(req.body.user_id)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User does not exist with this id");
                newTodo = typeorm_1.getRepository(Todos_1.Todos).create(__assign(__assign({}, req.body), { user: user }));
                return [4 /*yield*/, typeorm_1.getRepository(Todos_1.Todos).save(newTodo)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createTodo = createTodo;
var getTodos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Todos_1.Todos)
                    .find({ relations: ["user"] })];
            case 1:
                todos = _a.sent();
                return [2 /*return*/, res.json(todos)];
        }
    });
}); };
exports.getTodos = getTodos;
var getUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User does not exist");
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.getUserId = getUserId;
var delUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User does not exist");
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User)["delete"](user)
                        .then(function () {
                        var whiteSpace = " ";
                        var response = {
                            message: "User " + user.first_name.concat(whiteSpace, user.last_name) + " deleted",
                            state: true
                        };
                        return res.json(response);
                    })];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.delUserId = delUserId;
var updUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User does not exist");
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                return [4 /*yield*/, userRepo.update(user, req.body)
                        .then(function () {
                        var response = {
                            message: "User updated!",
                            state: true
                        };
                        return res.json(response);
                    })];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.updUserId = updUserId;
var updTodoId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, todoRepo, todo, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne(req.params.userid)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User does not exist");
                if (!req.body.done)
                    throw new utils_1.Exception("Please provide if todo is done");
                todoRepo = typeorm_1.getRepository(Todos_1.Todos);
                return [4 /*yield*/, todoRepo.find({ relations: ["user"], where: { user: req.params.userid, todo_id: req.params.todoid } })];
            case 2:
                todo = _a.sent();
                if (!todo.length)
                    throw new utils_1.Exception("Todo does not exist");
                req.body.date_modified = moment_1["default"]().format();
                return [4 /*yield*/, todoRepo.update(req.params.todoid, req.body).then(function () {
                        var response = {
                            message: "Todo updated!",
                            state: true
                        };
                        return res.json(response);
                    })];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(todo)];
        }
    });
}); };
exports.updTodoId = updTodoId;
var delTodoId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, todoRepo, todo, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne(req.params.userid)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User does not exist");
                todoRepo = typeorm_1.getRepository(Todos_1.Todos);
                return [4 /*yield*/, todoRepo.find({ relations: ["user"], where: { user: req.params.userid, todo_id: req.params.todoid } })];
            case 2:
                todo = _a.sent();
                if (!todo.length)
                    throw new utils_1.Exception("Todo does not exist");
                results = todoRepo.remove(todo).then(function () {
                    var response = {
                        message: "Todo deleted",
                        state: true
                    };
                    return res.json(response);
                });
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.delTodoId = delTodoId;
