"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDocumentToProductDto = void 0;
const convertDocumentToProductDto = (document) => {
    const dto = document.toObject();
    return Object.assign(Object.assign({}, dto), { _id: dto._id.toString() });
};
exports.convertDocumentToProductDto = convertDocumentToProductDto;
