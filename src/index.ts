import "dotenv/config";
import express from "express";
import session from "express-session";

import { keycloak, memoryStore } from "./keycloak";
import { errorHandler } from "./middleware/error-handler";
import protectedRoutes from "./routes/protected-routes";
import unprotectedRoutes from "./routes/unprotected-routes";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
app.use(express.json());
app.use(keycloak.middleware());
app.use(protectedRoutes);
app.use(unprotectedRoutes);
app.use(errorHandler);

app.get("/", (_req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
