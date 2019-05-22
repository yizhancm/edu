import express from 'express'
import fs from 'fs'
import nunjucks from 'nunjucks'


import config from './config.js'

import indexRouter from './routers/index.js'
import advertRouter from './routers/advert.js'

import bodyParser from './middlewares/body-parser.js'

import errLog from './middlewares/err-log.js'


const app = express()


nunjucks.configure(config.viewPath, {
	autoescape: true,
	express: app,
	noCache: true
})


// 处理静态请求
app.use('/node_modules', express.static(config.node_modules_path))
app.use('/public', express.static(config.public_path))

//解析处理表单POST请求体中间件 
app.use(bodyParser)


app.use(indexRouter)
app.use(advertRouter)

app.use(errLog)

app.listen(3000, () => {
	console.log('server in running at port 3000...')
})