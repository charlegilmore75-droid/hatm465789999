import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pinoHttp from "pino-http";
import authRouter from "./routes/auth.js";
import servicesRouter from "./routes/services.js";
import ordersRouter from "./routes/orders.js";
import walletRouter from "./routes/wallet.js";
import adminRouter from "./routes/admin.js";
import providersRouter from "./routes/providers.js";
import sectionsRouter from "./routes/sections.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = parseInt(process.env.PORT || "3000");

app.use(pinoHttp());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use(authRouter);
app.use(servicesRouter);
app.use(ordersRouter);
app.use(walletRouter);
app.use(adminRouter);
app.use(providersRouter);
app.use(sectionsRouter);

const clientDist = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDist));
app.get("*", (_req, res) => res.sendFile(path.join(clientDist, "index.html")));

app.listen(PORT, "0.0.0.0", () => console.log(`HATM server running on port ${PORT}`));
