"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const simSchema = new mongoose_1.Schema({
    formato: {
        type: String,
        required: true
    },
    anno: {
        type: Date,
        required: true
    },
    fornitore: {
        type: String,
        required: true,
    },
    pin: {
        type: String,
        required: true,
    },
    offerta: {
        type: Object,
        required: true,
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("sim", simSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltLnNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY2hlbWEvc2ltLnNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF3QztBQUd4QyxNQUFNLFNBQVMsR0FBVyxJQUFJLGlCQUFNLENBQ2hDO0lBRUksT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELElBQUksRUFBRztRQUNILElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsSUFBSSxFQUFDLE1BQU07UUFDWCxRQUFRLEVBQUMsSUFBSTtLQUNoQjtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixFQUNELEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUN2QixDQUFBO0FBQ0Qsa0JBQWUsSUFBQSxnQkFBSyxFQUFXLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyJ9