"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpesse = exports.createSpesse = void 0;
const express_validator_1 = require("express-validator");
const spesse_1 = __importDefault(require("../schema/spesse"));
function createSpesse(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const body = req.body;
        const addingSpesse = new spesse_1.default(body);
        addingSpesse.markModified("spesse");
        addingSpesse.save();
        console.log(addingSpesse);
        if (addingSpesse) {
            return res
                .status(202)
                .json({ message: "Spesse registered", spesse: addingSpesse });
        }
        else
            return res.status(204).json({ message: "Spesse not registered" });
    }
    catch (errors) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.createSpesse = createSpesse;
async function getSpesse(req, res) {
    try {
        const body = req.body;
        var responseFrom = undefined;
        await spesse_1.default.find({ from_id: body.id }, function (err, doc) {
            responseFrom = doc;
        }).clone();
        var responseTo = undefined;
        await spesse_1.default.find({ to_id: body.id }, function (err, doc) {
            responseTo = doc;
        }).clone();
        var calendars;
        if (responseFrom !== undefined) {
            calendars = [...responseFrom];
        }
        if (responseTo !== undefined) {
            calendars = [...calendars, ...responseTo];
        }
        return res.status(202).json({ message: "Spesse found", from: responseFrom, to: responseTo });
    }
    catch (error) {
        console.log(error);
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.getSpesse = getSpesse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Blc3NlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvc3Blc3NlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EseURBQXFEO0FBRXJELDhEQUE0QztBQUU1QyxTQUFnQixZQUFZLENBQUMsR0FBa0IsRUFBRSxHQUFhO0lBQzVELElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRyxJQUFBLG9DQUFnQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDckIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN0QixNQUFNLFlBQVksR0FBRyxJQUFJLGdCQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxQixJQUFJLFlBQVksRUFBRTtZQUNoQixPQUFPLEdBQUc7aUJBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQztpQkFDWCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7U0FDakU7O1lBQU0sT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUM7S0FDMUU7SUFBQyxPQUFPLE1BQU0sRUFBRTtRQUNmLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO0tBQ25FO0FBQ0gsQ0FBQztBQXBCRCxvQ0FvQkM7QUFFTSxLQUFLLFVBQVUsU0FBUyxDQUFDLEdBQWtCLEVBQUUsR0FBYTtJQUMvRCxJQUFJO1FBQ0YsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLFlBQVksR0FBUSxTQUFTLENBQUM7UUFDbEMsTUFBTSxnQkFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUM3RCxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1gsSUFBSSxVQUFVLEdBQVEsU0FBUyxDQUFDO1FBQ2hDLE1BQU0sZ0JBQVksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUc7WUFDekQsVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksU0FBUyxDQUFDO1FBQ2QsSUFBRyxZQUFZLEtBQUssU0FBUyxFQUFDO1lBQzFCLFNBQVMsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUM7U0FDakM7UUFDRCxJQUFHLFVBQVUsS0FBSyxTQUFTLEVBQUM7WUFDeEIsU0FBUyxHQUFHLENBQUMsR0FBRyxTQUFTLEVBQUUsR0FBRyxVQUFVLENBQUMsQ0FBQztTQUM3QztRQUNELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7S0FDOUY7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUM7S0FDbkU7QUFDSCxDQUFDO0FBdkJELDhCQXVCQyJ9