"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTreatments = exports.createTreatment = void 0;
const express_validator_1 = require("express-validator");
const treatment_1 = __importDefault(require("../schema/treatment"));
function createTreatment(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const body = req.body;
        const addingTreatment = new treatment_1.default(body);
        addingTreatment.markModified("calendar");
        addingTreatment.save();
        console.log(addingTreatment);
        if (addingTreatment) {
            return res
                .status(202)
                .json({ message: "Treatment registered", treatment: addingTreatment });
        }
        else
            return res.status(204).json({ message: "Treatment not registered" });
    }
    catch (errors) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.createTreatment = createTreatment;
async function getTreatments(req, res) {
    try {
        const body = req.body;
        var responseFrom = undefined;
        await treatment_1.default.find({ from_id: body.id }, function (err, doc) {
            responseFrom = doc;
        }).clone();
        var responseTo = undefined;
        await treatment_1.default.find({ to_id: body.id }, function (err, doc) {
            responseTo = doc;
        }).clone();
        var calendars;
        console.log(responseFrom);
        if (responseFrom !== undefined) {
            calendars = [...responseFrom];
        }
        if (responseTo !== undefined) {
            calendars = [...calendars, ...responseTo];
        }
        console.log(calendars);
        var treatmentsUnique;
        if (calendars?.lenght > 0) {
            treatmentsUnique = calendars.filter((obj, index) => calendars.findIndex((item) => item._id === obj._id) === index);
        }
        return res.status(202).json({ message: "Treatments found", treatments: calendars.filter((item, index, array) => index === array.findIndex(foundItem => item._id === foundItem._id)) });
    }
    catch (error) {
        console.log(error);
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.getTreatments = getTreatments;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlYXRtZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvdHJlYXRtZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EseURBQXFEO0FBRXJELG9FQUFrRDtBQUVsRCxTQUFnQixlQUFlLENBQUMsR0FBa0IsRUFBRSxHQUFhO0lBQy9ELElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRyxJQUFBLG9DQUFnQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDckIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN0QixNQUFNLGVBQWUsR0FBRyxJQUFJLG1CQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsZUFBZSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3QixJQUFJLGVBQWUsRUFBRTtZQUNuQixPQUFPLEdBQUc7aUJBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQztpQkFDWCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7U0FDMUU7O1lBQU0sT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxDQUFDLENBQUM7S0FDN0U7SUFBQyxPQUFPLE1BQU0sRUFBRTtRQUNmLE9BQU8s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