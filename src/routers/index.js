import express from 'express'
import * as indexController from '../controllers/index.js'

const router = express.Router()

router.get('/', indexController.showIndex)

export default router