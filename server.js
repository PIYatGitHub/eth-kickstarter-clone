const next = require('next')
const routes = require('./routes')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)
const { createServer } = require('http')

app.prepare().then(() => {
    createServer(handler).listen(3333, (err) => {
        if (err) throw err
        console.log("App is listening on port 3333!")
    })
})