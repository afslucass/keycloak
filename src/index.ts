import "dotenv/config";
import express from "express";
import session from "express-session";

import { errorHandler } from "./middleware/error-handler";
import { Issuer, Strategy } from "openid-client";

import cors from "cors";
import passport from "passport";

const app = express();
const PORT = process.env.PORT;

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

// mano, estou morgando, no caso, o access token ja esta sendo gerado no postman, aqui na rota
// do bff, eh so validar o access token usando a public key do kewycloak, se for valido esta autenticado.
// usa lib do jwt para validar.

// app.use(unprotectedRoutes);
app.use(errorHandler);

app.get("/", (_req: any, res: any) => {
  res.send("Erro!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
