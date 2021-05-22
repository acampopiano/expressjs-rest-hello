"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.Todos = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Todos = /** @class */ (function (_super) {
    __extends(Todos, _super);
    function Todos() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Todos.prototype, "todo_id");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Todos.prototype, "done");
    __decorate([
        typeorm_1.Column('timestamp with time zone', { nullable: false, "default": function () { return 'CURRENT_TIMESTAMP'; } }),
        __metadata("design:type", Date)
    ], Todos.prototype, "date_created");
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Date)
    ], Todos.prototype, "date_modified");
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.todos; }, {
            nullable: false,
            onDelete: 'CASCADE'
        }),
        typeorm_1.JoinColumn({ name: 'user_id' }) //aqui le pongo un nombre a la fk que hace la relacion con usuario, y no el que pone por default typeorm
        ,
        __metadata("design:type", User_1.User)
    ], Todos.prototype, "user");
    Todos = __decorate([
        typeorm_1.Entity()
    ], Todos);
    return Todos;
}(typeorm_1.BaseEntity));
exports.Todos = Todos;
