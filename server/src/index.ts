import express, { Application, Request } from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { envConfig } from "./config/config";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import morgan from "morgan";
import passport from "passport";
import { engine } from "express-handlebars";

import routes from "./routes";
import jwtStrategy from "./config/passport";
import errorMiddleware from "./middleware/error";
import path from "path";

let server;
const app: Application = express();
const port = process.env.PORT || 5000;
app.use(cors({ origin: "*" }));
mongoose
  .connect(envConfig.mongoose.url, envConfig.mongoose.options as ConnectOptions)
  .then(() => {
    console.log(`Connected to DB URL ${envConfig.mongoose.url}`);
    server = app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error", error);
  });

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

// gzip compression
app.use(compression());

// sanitize request data
// app.use(xss());
app.use(mongoSanitize());
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// const corsOptions = {
//   origin: ["http://localhost:3000"],
//   optionsSuccessStatus: 200, // For legacy browser support
// };

// // // enable cors
// app.use(cors(corsOptions));
// routes.use(cors());
// app.use((req, resp, next) => {
//   next();
// }, cors({ maxAge: 84600 }));
// app.use("*", cors<Request>());
// app.options("*", cors(corsOptions));
// app.use(
//   "/api",
//   createProxyMiddleware({ target: "http://localhost:8000", changeOrigin: true })
// );

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("images"));

// routes.use(cors());
app.use("/api", routes);

// convert error to ApiError, if needed
app.use(errorMiddleware.errorConverter);

// handle error
app.use(errorMiddleware.errorHandler);
