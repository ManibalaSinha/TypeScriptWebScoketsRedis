import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* import express, {Request, Response} from "express";

const app = express();
const port = 3000;

interface User {
   id: number;
   name: string;
}

let users: User[] = [];
let nextId = 1;

app.get("/users", (req: Request, res: Response) => {
   res.json(users);
   
});

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
   res.send("HEllo Backend");
});
app.listen(port, ()=>{
   console.log('Server runnign at http://localhost:${port} ');
});
 */