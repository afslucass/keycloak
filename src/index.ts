import "dotenv/config";
import express from "express";
import session from "express-session";

// import { keycloak, memoryStore } from "./keycloak";
import { errorHandler } from "./middleware/error-handler";
// import protectedRoutes from "./routes/protected-routes";
import unprotectedRoutes from "./routes/unprotected-routes";
import cors from "cors";
import KeycloakConnect from "keycloak-connect";

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "*", // ou '*' para desenvolvimento
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Authorization, Content-Type",
  })
);
app.use(express.json());

const memoryStore = new session.MemoryStore();
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
const keycloak = new KeycloakConnect(
  { store: memoryStore },
  {
    "bearer-only": true,
    realm: "app",
    "auth-server-url": "http://dev:8080/",
    "ssl-required": "external",
    resource: "service-app",
    "confidential-port": 0,
  }
);
app.use(keycloak.middleware());

app.post("/send-data", keycloak.protect("READ"), (req, res) => {
  console.log(`DEU BOM`);
  console.log(req.headers);
  res.json({});
});

// app.use(unprotectedRoutes);
app.use(errorHandler);

app.get("/", (_req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
