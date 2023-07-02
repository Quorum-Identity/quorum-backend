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
const history_controller_1 = __importDefault(require("./controller/history.controller"));
const calendar_controller_1 = __importDefault(require("./controller/calendar.controller"));
const treatment_controller_1 = __importDefault(require("./controller/treatment.controller"));
const port = 3001;
exports.app = (0, server_1.default)();
mongoose_1.default.connect('mongodb+srv://canitrotbartolome:juInQ2XWJkOIWiqa@cluster0.x5zoaac.mongodb.net/valeriani?retryWrites=true&w=majority', err => {
    if (err)
        throw err;
    console.log('connected to MongoDB');
});
exports.app.use("/treatment", auth_midd_1.globalAuthorization, treatment_controller_1.default);
exports.app.use("/calendar", auth_midd_1.globalAuthorization, calendar_controller_1.default);
exports.app.use("/user", auth_midd_1.globalAuthorization, user_controller_1.default);
exports.app.use("/history", auth_midd_1.globalAuthorization, history_controller_1.default);
exports.app.listen(port, async () => {
    console.log(`App is running at http://localhost:${port}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0REFBMEM7QUFDMUMsd0RBQStCO0FBQy9CLHNEQUE2RDtBQUM3RCxtRkFBc0Q7QUFDdEQseUZBQTREO0FBQzVELDJGQUE4RDtBQUM5RCw2RkFBZ0U7QUFFaEUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ0wsUUFBQSxHQUFHLEdBQUcsSUFBQSxnQkFBWSxHQUFFLENBQUM7QUFDbEMsa0JBQVEsQ0FBQyxPQUFPLENBQUMscUhBQXFILEVBQ3BJLEdBQUcsQ0FBQyxFQUFFO0lBQ0YsSUFBRyxHQUFHO1FBQUUsTUFBTSxHQUFHLENBQUM7SUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQyxDQUFDO0FBQ0gsV0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsK0JBQW1CLEVBQUUsOEJBQWUsQ0FBQyxDQUFDO0FBQzVELFdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLCtCQUFtQixFQUFFLDZCQUFjLENBQUMsQ0FBQztBQUMxRCxXQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSwrQkFBbUIsRUFBRSx5QkFBVSxDQUFDLENBQUM7QUFDbEQsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsK0JBQW1CLEVBQUUsNEJBQWEsQ0FBQyxDQUFDO0FBRXhELFdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDNUQsQ0FBQyxDQUFDLENBQUMifQ==