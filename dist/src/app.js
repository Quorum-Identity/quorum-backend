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
const private_1 = __importDefault(require("./controller/private"));
const business_1 = __importDefault(require("./controller/business"));
const society_1 = __importDefault(require("./controller/society"));
const dealerController_1 = __importDefault(require("./controller/dealerController"));
const port = 3001;
exports.app = (0, server_1.default)();
mongoose_1.default.connect('mongodb+srv://canitrotbartolome:juInQ2XWJkOIWiqa@cluster0.x5zoaac.mongodb.net/edesk?retryWrites=true&w=majority', err => {
    if (err)
        throw err;
    console.log('connected to MongoDB');
});
exports.app.use("/user", auth_midd_1.globalAuthorization, user_controller_1.default);
exports.app.use("/private", private_1.default);
exports.app.use("/business", business_1.default);
exports.app.use("/society", society_1.default);
exports.app.use("/dealers", dealerController_1.default);
exports.app.listen(port, async () => {
    console.log(`App is running at http://localhost:${port}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0REFBMEM7QUFDMUMsd0RBQStCO0FBQy9CLHNEQUE2RDtBQUM3RCxtRkFBc0Q7QUFDdEQsbUVBQWlEO0FBQ2pELHFFQUFrRDtBQUNsRCxtRUFBaUQ7QUFDakQscUZBQXlEO0FBQ3pELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztBQUNMLFFBQUEsR0FBRyxHQUFHLElBQUEsZ0JBQVksR0FBRSxDQUFDO0FBRWxDLGtCQUFRLENBQUMsT0FBTyxDQUFDLGlIQUFpSCxFQUNoSSxHQUFHLENBQUMsRUFBRTtJQUNGLElBQUcsR0FBRztRQUFFLE1BQU0sR0FBRyxDQUFDO0lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUMsQ0FBQztBQUVILFdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLCtCQUFtQixFQUFFLHlCQUFVLENBQUMsQ0FBQztBQUNsRCxXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxpQkFBYSxDQUFDLENBQUE7QUFDbEMsV0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsa0JBQWEsQ0FBQyxDQUFBO0FBQ25DLFdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGlCQUFhLENBQUMsQ0FBQTtBQUNsQyxXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSwwQkFBWSxDQUFDLENBQUE7QUFDakMsV0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM1RCxDQUFDLENBQUMsQ0FBQyJ9