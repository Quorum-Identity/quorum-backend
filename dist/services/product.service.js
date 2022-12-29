"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductGeneral = exports.updateProductState = exports.getAllProducts = exports.getProductById = exports.getProduct = exports.addProduct = void 0;
const express_validator_1 = require("express-validator");
const product_schema_1 = __importDefault(require("../schema/product.schema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function addProduct(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const token = req.cookies.access_token;
        const { _id } = jsonwebtoken_1.default.verify(token, "SECRET_EXAMPLE_KEY");
        const body = req.body;
        const addingProduct = new product_schema_1.default({
            name: body.name,
            description: body.description,
            date_publishing: new Date(),
            by_id: _id,
            price: body.price,
            ammount: body.ammount,
            images: body.images,
            type: body.type,
            state: 0
        });
        addingProduct.markModified('users');
        addingProduct.save();
        if (addingProduct) {
            return res.status(202).json({ message: "Product registered", product: addingProduct });
        }
        else
            return res.status(204).json({ message: "Product not registered" });
    }
    catch (error) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.addProduct = addProduct;
async function getProduct(req, res) {
    try {
        const token = req.cookies.access_token;
        const { _id } = jsonwebtoken_1.default.verify(token, "SECRET_EXAMPLE_KEY");
        const product = await product_schema_1.default.find({ by_id: _id });
        if (product) {
            return res.status(202).json({ message: "Product data", products: product });
        }
        else
            return res.status(404).json({ message: "Invalid product" });
    }
    catch (error) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.getProduct = getProduct;
async function getProductById(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const body = req.body;
        const product = await product_schema_1.default.findOne({ _id: body.id });
        if (product) {
            return res.status(202).json({ message: "Product data", product: product });
        }
        else
            return res.status(404).json({ message: "Not found products" });
    }
    catch (error) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.getProductById = getProductById;
async function getAllProducts(req, res) {
    try {
        const product = await product_schema_1.default.find();
        if (product) {
            return res.status(202).json({ message: "Product data", products: product });
        }
        else
            return res.status(404).json({ message: "Not found products" });
    }
    catch (error) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.getAllProducts = getAllProducts;
async function updateProductState(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { state, id } = req.body;
        product_schema_1.default.findOneAndUpdate({ _id: id }, { state }, { upsert: true }, function (err, doc) {
            if (err)
                return res.status(404).json({ message: "Invalid product" });
            return res.status(202).json({ message: "Product state updated" });
        });
    }
    catch (error) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.updateProductState = updateProductState;
async function updateProductGeneral(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { images, name, description, price, ammount, type, id } = req.body;
        product_schema_1.default.findOneAndUpdate({ _id: id }, { images, name, description, price, ammount, type }, { upsert: true }, function (err, doc) {
            if (err)
                return res.status(404).json({ message: "Invalid product" });
            return res.status(202).json({ message: "Product data updated" });
        });
    }
    catch (error) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.updateProductGeneral = updateProductGeneral;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL3Byb2R1Y3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSx5REFBb0Q7QUFDcEQsOEVBQXFEO0FBR3JELGdFQUErQztBQUUvQyxLQUFLLFVBQVUsVUFBVSxDQUFFLEdBQVksRUFBRSxHQUFhO0lBQ2xELElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRyxJQUFBLG9DQUFnQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDckIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDdkMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLHNCQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxvQkFBb0IsQ0FBZSxDQUFDO1FBQ3RFLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUE2RixDQUFBO1FBQzlHLE1BQU0sYUFBYSxHQUFHLElBQUksd0JBQWEsQ0FBQztZQUN0QyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsZUFBZSxFQUFFLElBQUksSUFBSSxFQUFFO1lBQzNCLEtBQUssRUFBRSxHQUFHO1lBQ1YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLENBQUM7U0FD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