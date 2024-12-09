import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
	PORT: process.env.PORT || 5000,
	MONGO_URI: 'mongodb+srv://vaddoriyavivek9:vivek.1701@imagedressing.qma0i.mongodb.net/personalblog?retryWrites=true&w=majority',
};
