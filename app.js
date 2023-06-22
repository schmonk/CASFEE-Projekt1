import express from 'express';
import bodyParser from 'body-parser';
import path, {dirname} from 'path';

import {orderRoutes} from './routes/order-routes.js';
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = express();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));

app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile("/html/index.html", {root: __dirname + '/public/'});
});

app.use("/tasks", orderRoutes);

