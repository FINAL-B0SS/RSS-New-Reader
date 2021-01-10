"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const utils_1 = require("./utils");
const app = express_1.default();
const port = 8080;
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.set('view engine', 'html');
// Fetch rss feed information given XML link
app.get('/api/fetchFeed', (req, res) => {
    const link = req.query.link;
    if (typeof link === 'string') {
        res.send(utils_1.fetchFeedInfo(link));
    }
});
// Fetch rss feed items
app.get('/api/fetchItems', (req, res) => {
    const link = req.query.link;
    if (typeof link === 'string') {
        res.send(utils_1.fetchItems(link));
    }
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err,
    });
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
module.exports = app;
