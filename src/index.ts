import "dotenv/config";
import express from "express";

import { errorHandler } from "./middleware/error-handler";
import protectedRoutes from "./routes/protected-routes";
import unprotectedRoutes from "./routes/unprotected-routes";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(protectedRoutes);
app.use(unprotectedRoutes);
app.use(errorHandler);

app.get("/", (_req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
