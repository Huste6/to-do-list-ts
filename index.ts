import express,{Express} from "express"
import * as database from "./config/database"
import dotenv from "dotenv";
import mainV1Routes from "./api/v1/routes/index.route";
import bodyParser from "body-parser"

dotenv.config();

database.connect();

const app:Express = express();
const port:string | number = process.env.PORT || 3000;

//parse application/json
app.use(bodyParser.json());

mainV1Routes(app);

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})