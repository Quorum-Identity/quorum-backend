"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const server_1 = __importDefault(require("./utils/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_midd_1 = require("./middleware/auth.midd");
const user_controller_1 = __importDefault(require("./controller/user.controller"));
const product_controller_1 = __importDefault(require("./controller/product.controller"));
const port = 3001;
exports.app = (0, server_1.default)();
mongoose_1.default.connect('mongodb+srv://nickname:uF07PaNHQh79tpO5@cluster0.bpdzobz.mongodb.net/vediloo?retryWrites=true&w=majority', err => {
    if (err)
        throw err;
    console.log('connected to MongoDB');
});
exports.app.use("/user", auth_midd_1.globalAuthorization, user_controller_1.default);
exports.app.use("/product", auth_midd_1.globalAuthorization, product_controller_1.default);
exports.app.listen(port, async () => {
    console.log(`App is running at http://localhost:${port}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0REFBMEM7QUFDMUMsd0RBQStCO0FBQy9CLHNEQUE2RDtBQUM3RCxtRkFBcUQ7QUFDckQseUZBQTJEO0FBRTNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztBQUNMLFFBQUEsR0FBRyxHQUFHLElBQUEsZ0JBQVksR0FBRSxDQUFDO0FBR2xDLGtCQUFRLENBQUMsT0FBTyxDQUFDLDBHQUEwRyxFQUN6SCxHQUFHLENBQUMsRUFBRTtJQUNGLElBQUcsR0FBRztRQUFFLE1BQU0sR0FBRyxDQUFDO0lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUMsQ0FBQztBQU1ILFdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLCtCQUFtQixFQUFFLHlCQUFVLENBQUMsQ0FBQztBQUNsRCxXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSwrQkFBbUIsRUFBRSw0QkFBYSxDQUFDLENBQUM7QUFJeEQsV0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM1RCxDQUFDLENBQUMsQ0FBQyJ9