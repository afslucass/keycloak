import "dotenv/config";
import express from "express";

import { errorHandler } from "./middleware/error-handler";
import router from "./routes/protected-routes";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
