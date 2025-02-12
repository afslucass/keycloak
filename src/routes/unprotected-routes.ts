import express from "express";

const router = express.Router();

// Isso aqui nao existe, nao eh boa pratica usar rotas da aplicacao para trafegar credenciais, vamos usar o protocolo OAuth2

// no mobile, o app ira abrir o formulario de login no browser, apos ser autenticado no formulario (keycloak, google), o browser

// chamara um deeplink para o app, enviando dados como o access_token, q eh o codigo q autentica o usuario.

router.get("/login", () => {});
router.put("/create-account", () => {});

export default router;
