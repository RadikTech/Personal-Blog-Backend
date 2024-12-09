import express from "express";
import path from "path";
import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
import bodyParser from "body-parser";
import cors from "cors";
import blogRoutes from "./routes/auth.route.js";

const app = express();

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(cors());
app.use(bodyParser.json());
// app.use(express.json()); // will allow us to parse req.body

app.get('/', async (req, res) => {
	res.json({
		status: 0,
		message: "Send to website",
	});
});

app.use("/api", blogRoutes);

app.use((req, res, next) => {
	res.json({
		status: 0,
		message: "No path found",
	});
});

if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});
