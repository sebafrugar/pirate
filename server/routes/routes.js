const UserController = require('../controllers/user.controller');
const authenticate = require('../config/authenticate')
const PirateController = require("../controllers/pirate.controller");

module.exports = function(app){

    app.post("/api/register", UserController.Register);
    app.post("/api/login", UserController.Login);
    app.post("/api/logout", UserController.Logout);
    //Para acceder a estas rutas hay que estar autenticado.
    app.get("/api/users", authenticate, UserController.getAll);
    app.get('/api/user/:id', authenticate, UserController.getUser);

    //Ruta de los piratas arg!
    app.post("/api/pirates/new",PirateController.createNewPirate);
    app.get("/api/pirates",PirateController.findAllPirates);
    app.get("/api/pirates/:id",PirateController.findOnePirate);
    app.post("/api/pirates/changeskill/:skill/:id",PirateController.changeSkill);
    app.delete("/api/pirates/delete/:id",PirateController.deletePirate);
}