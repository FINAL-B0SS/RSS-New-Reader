import createError from 'http-errors'
import express, { Application, Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { fetchFeedInfo, fetchItems } from './utils'

interface Error {
	message: string
	status: number
}

const app: Application = express()
const port = 8080
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.set('view engine', 'html')

// Fetch rss feed information given XML link
app.get('/api/fetchFeed', (req: Request, res: Response) => {
	const link = req.query.link

	if (typeof link === 'string') {
		res.send(fetchFeedInfo(link))
	}
})

// Fetch rss feed items
app.get('/api/fetchItems', (req: Request, res: Response) => {
	const link = req.query.link

	if (typeof link === 'string') {
		res.send(fetchItems(link))
	}
})

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
	next(createError(404))
})

// error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	res.status(err.status || 500)
	res.json({
		message: err.message,
		error: err,
	})
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})

module.exports = app
