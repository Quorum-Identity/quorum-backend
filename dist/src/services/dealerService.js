"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDealer = exports.loginDealer = exports.getDealer = exports.resetPassword = exports.getUserDealers = exports.getDealerByCodice = exports.createDealer = void 0;
const express_validator_1 = require("express-validator");
const dealerSchema_1 = __importDefault(require("../schema/dealerSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createDealer(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randPassword = [...Array(8)].map(_ => c[~~(Math.random() * c.length)]).join('');
        let encryptedrandPassword = bcrypt_1.default.hashSync(randPassword.toString(), 10);
        const body = req.body;
        const addingDealer = new dealerSchema_1.default({
            tipologia: body.tipologia,
            ragioneSociale: body.ragioneSociale,
            tipoAzienda: body.tipoAzienda,
            email: body.email,
            password: encryptedrandPassword,
            username: body.username,
            indirizzo: body.indirizzo,
            comune: body.comune,
            provincia: body.provincia,
            cap: body.cap,
            pIva: body.pIva,
            cFiscale: body.cFiscale,
            sdi: body.sdi,
            pec: body.pec,
            referente: body.referente,
            telefono: body.telefono,
            emailRef: body.emailRef,
            ruole: body.ruole,
            dominio: body.dominio,
            credito: body.credito,
            sim: body.sim,
            from_id: body.from_id ?? ''
        });
        addingDealer.markModified("dealers");
        addingDealer.save();
        if (addingDealer) {
            return res
                .status(202)
                .json({ message: "Dealer/Master Dealer registered", user: addingDealer, password: randPassword });
        }
        else
            return res.status(204).json({ message: "Dealer/Master Dealer not registered" });
    }
    catch (errors) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.createDealer = createDealer;
function getDealerByCodice(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { cFiscale } = req.body;
        dealerSchema_1.default.findOne({ cFiscale }, function (err, doc) {
            if (err)
                return res.status(404).json({ message: "Dealer don't found" });
            console.log(res.status);
            return res.status(202).json({ message: "Dealer found", dealers: doc });
        });
    }
    catch (error) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.getDealerByCodice = getDealerByCodice;
function getUserDealers(req, res) {
    try {
        dealerSchema_1.default.findOne({ from_id: req._id }, function (err, doc) {
            if (err)
                return res.status(404).json({ message: "Dealers don't found" });
            return res.status(202).json({ message: "Dealer found", dealers: doc });
        });
    }
    catch (error) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.getUserDealers = getUserDealers;
function resetPassword(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { _id } = req.body;
        const c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randPassword = [...Array(8)].map(_ => c[~~(Math.random() * c.length)]).join('');
        let encryptedrandPassword = bcrypt_1.default.hashSync(randPassword.toString(), 10);
        dealerSchema_1.default.findOneAndUpdate({ _id }, { password: encryptedrandPassword }, function (err, doc) {
            if (err)
                return res.status(404).json({ message: "invalid body or error" });
            return res.status(202).json({ message: "Password Updated", password: randPassword });
        });
    }
    catch (error) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.resetPassword = resetPassword;
function getDealer(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        dealerSchema_1.default.findOne({ _id: req._id }, function (err, doc) {
            if (err)
                return res.status(404).json({ message: "Dealer don't found" });
            return res.status(202).json({ message: "Dealer found", dealers: doc });
        });
    }
    catch (error) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.getDealer = getDealer;
async function loginDealer(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const body = req.body;
        const account = await dealerSchema_1.default.findOne({ email: body.email });
        if (account) {
            if (bcrypt_1.default.compareSync(body.password.toString(), account.password.toString())) {
                const token = jsonwebtoken_1.default.sign({ _id: account._id?.toString() }, "SECRET_EXAMPLE_KEY", {
                    expiresIn: '2 days',
                });
                return res.status(202).json({ message: "Account loggin", user: account, token });
            }
            else
                return res.status(404).json({ message: "Invalid password" });
        }
        else
            return res.status(404).json({ message: "Account not found" });
    }
    catch (error) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.loginDealer = loginDealer;
function updateDealer(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { cFiscale } = req.body;
        dealerSchema_1.default.findOneAndUpdate({ cFiscale }, function (err, doc) {
            if (err)
                return res.status(404).json({ message: "invalid Account" });
            return res.status(202).json({ message: "invalid body or error" });
        });
    }
    catch (error) {
        return res.status(505).json({ message: "invalid body" });
    }
}
exports.updateDealer = updateDealer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVhbGVyU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9kZWFsZXJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHlEQUFxRDtBQUVyRCwwRUFBa0Q7QUFDbEQsb0RBQTRCO0FBQzVCLGdFQUErQztBQUsvQyxTQUFnQixZQUFZLENBQUMsR0FBa0IsRUFBRSxHQUFhO0lBQzVELElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRyxJQUFBLG9DQUFnQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDckIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsTUFBTSxDQUFDLEdBQUcsZ0VBQWdFLENBQUM7UUFDM0UsSUFBSSxZQUFZLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEYsSUFBSSxxQkFBcUIsR0FBRyxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFekUsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBd0JoQixDQUFDO1FBQ0YsTUFBTSxZQUFZLEdBQUcsSUFBSSxzQkFBWSxDQUFDO1lBQ3BDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbkMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixRQUFRLEVBQUcscUJBQXFCO1lBQ2hDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixPQUFPLEVBQUcsSUFBSSxDQUFDLE9BQU87WUFDdEIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRTtTQUM1QixDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNuQixJQUFJLFlBQVksRUFBRTtZQUNoQixPQUFPLEdBQUc7aUJBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQztpQkFDWCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztTQUNyRzs7WUFBTSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHFDQUFxQyxFQUFFLENBQUMsQ0FBQztLQUN4RjtJQUFDLE9BQU8sTUFBTSxFQUFFO1FBQ2YsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUM7S0FDbkU7QUFDSCxDQUFDO0FBckVELG9DQXFFQztBQUVELFNBQWdCLGlCQUFpQixDQUFDLEdBQVksRUFBRSxHQUFhO0lBQzNELElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRyxJQUFBLG9DQUFnQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDckIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFnQyxDQUFDO1FBQzFELHNCQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUNuRCxJQUFJLEdBQUc7Z0JBQUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7WUFDeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFeEIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUM7S0FDbkU7QUFDSCxDQUFDO0FBaEJELDhDQWdCQztBQUdELFNBQWdCLGNBQWMsQ0FBQyxHQUFrQixFQUFFLEdBQWE7SUFDOUQsSUFBSTtRQUdGLHNCQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHO1lBQzNELElBQUksR0FBRztnQkFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLENBQUMsQ0FBQztZQUV6RSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQztLQUNuRTtBQUNILENBQUM7QUFaRCx3Q0FZQztBQUdELFNBQWdCLGFBQWEsQ0FBQyxHQUFrQixFQUFFLEdBQWE7SUFDN0QsSUFBSTtRQUNGLE1BQU0sTUFBTSxHQUFHLElBQUEsb0NBQWdCLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNyQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDekQ7UUFDRCxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQTJCLENBQUM7UUFDaEQsTUFBTSxDQUFDLEdBQUcsZ0VBQWdFLENBQUM7UUFDM0UsSUFBSSxZQUFZLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEYsSUFBSSxxQkFBcUIsR0FBRyxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekUsc0JBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUMxRixJQUFJLEdBQUc7Z0JBQUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUM7WUFDM0UsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUN2RixDQUFDLENBQUMsQ0FBQztLQUVKO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQztLQUNuRTtBQUNILENBQUM7QUFsQkQsc0NBa0JDO0FBRUQsU0FBZ0IsU0FBUyxDQUFFLEdBQWtCLEVBQUUsR0FBYTtJQUMxRCxJQUFJO1FBQ0YsTUFBTSxNQUFNLEdBQUcsSUFBQSxvQ0FBZ0IsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN6RDtRQUNELHNCQUFZLENBQUMsT0FBTyxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUMsRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHO1lBQ3JELElBQUksR0FBRztnQkFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztZQUN4RSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQztLQUNuRTtBQUNILENBQUM7QUFiRCw4QkFhQztBQUVPLEtBQUssVUFBVSxXQUFXLENBQUUsR0FBWSxFQUFFLEdBQWE7SUFDN0QsSUFBSTtRQUNGLE1BQU0sTUFBTSxHQUFHLElBQUEsb0NBQWdCLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNyQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDekQ7UUFDRCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBMEMsQ0FBQTtRQUMzRCxNQUFNLE9BQU8sR0FBRyxNQUFNLHNCQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLElBQUcsT0FBTyxFQUFDO1lBQ1QsSUFBSSxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRTtnQkFDN0UsTUFBTSxLQUFLLEdBQUcsc0JBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLG9CQUFvQixFQUFFO29CQUM3RSxTQUFTLEVBQUUsUUFBUTtpQkFDcEIsQ0FBQyxDQUFDO2dCQUNILE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2FBQ2hGOztnQkFBTSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFDLENBQUMsQ0FBQztTQUNuRTs7WUFBTSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFDLENBQUMsQ0FBQTtLQUNuRTtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBQyxDQUFDLENBQUM7S0FDakU7QUFDSCxDQUFDO0FBbkJBLGtDQW1CQTtBQUdELFNBQWdCLFlBQVksQ0FBQyxHQUFZLEVBQUUsR0FBYTtJQUN0RCxJQUFJO1FBQ0YsTUFBTSxNQUFNLEdBQUcsSUFBQSxvQ0FBZ0IsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN6RDtRQUNELE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBZ0MsQ0FBQztRQUMxRCxzQkFBWSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUM1RCxJQUFJLEdBQUc7Z0JBQUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7WUFDckUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO0tBQzFEO0FBQ0gsQ0FBQztBQWRELG9DQWNDIn0=