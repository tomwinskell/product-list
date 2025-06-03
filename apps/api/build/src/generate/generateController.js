"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateController = void 0;
const tsoa_1 = require("tsoa");
const generateService_1 = require("./generateService");
let GenerateController = class GenerateController extends tsoa_1.Controller {
    /**
     * Generates products and reviews then saves them to the database.
     */
    generateData() {
        return __awaiter(this, void 0, void 0, function* () {
            return new generateService_1.GenerateService().generateData();
        });
    }
};
exports.GenerateController = GenerateController;
__decorate([
    (0, tsoa_1.SuccessResponse)('201', 'Created'),
    (0, tsoa_1.Get)()
], GenerateController.prototype, "generateData", null);
exports.GenerateController = GenerateController = __decorate([
    (0, tsoa_1.Route)('generate')
], GenerateController);
