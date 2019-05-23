import express from 'express'
import Advert from '../models/advert.js'
import formidable from 'formidable'
import { basename } from 'path'

import  config from '../config.js'

const router = express.Router()

router.get('/advert', (req, res, next) => {
	res.render('advert_list.html')
	// const page = Number.parseInt(req.query.page) ? Number.parseInt(req.query.page) : 1
	// const pageSize = 5
	// console.log(page);
	// Advert
	// 	.find()
	// 	.skip((page-1) * pageSize)
	// 	.limit(pageSize)
	// 	.exec((err, adverts) => {
	// 		if(err) {
	// 			return next(err)
	// 		}			
	// 		res.render('advert_list.html', {
	// 			adverts,
	// 			totolPage,
	// 			page
	// 		})			
	// 	}		
	// })

})

router.get('/advert/count', (req, res, next) => {
	Advert.count((err, count) => {
		if (err) {
			return next(err)
		}
		res.json({
			err_code: 0,
			result: count
		})
	})
})

router.get('/advert/add', (req, res, next) => {
	res.render('advert_add.html')
})


router.post('/advert/add', (req, res, next) => {	
	// const form = new formidable.IncomingForm()
	// form.uploadDir = config.uploadDir
	// form.keepExtensions = true
	// form.parse(req, (err, fields, files) => {
	// 	if (err) {
	// 		return next(err)
	// 	}
	// 	const body = fields
	// 	body.image = basename(files.image.path)			
	// 	const advert = new Advert({
	// 		title: body.title,
	// 		image: body.image,
	// 		link: body.link,
	// 		start_time: body.start_time,
	// 		end_time: body.end_time				
	// 	})
	// 	advert.save((err, result) => {
	// 		if (err) {
	// 			return next(err)
	// 		}
	// 		res.json({
	// 			err_code: 0
	// 		})
	// 	})
	// })

	pmFormidable(req)
		.then(([fields, files]) => {
			const body = fields
			body.image = basename(files.image.path)			
			const advert = new Advert({
				title: body.title,
				image: body.image,
				link: body.link,
				start_time: body.start_time,
				end_time: body.end_time				
			})
			return advert.save()
		})
		.then((result) => {				
			res.json({
				err_code: 0
			})
		})
		.catch(err => {
			next(err)
		})

	function pmFormidable (req)  {
		return new Promise((resolve, reject) => {
			const form = new formidable.IncomingForm()
			form.uploadDir = config.uploadDir
			form.keepExtensions = true
			form.parse(req, (err, fields, files) => {
				if(err) {
					reject(err)
				}
				resolve([fields, files])
			})
		})
	}

	
})

router.get('/advert/list', (req, res, next)=> {
	let { page, pageSize } = req.query
	page = Number.parseInt(page)
	pageSize = Number.parseInt(pageSize)
	Advert
		.find()
		.skip((page - 1) * pageSize)
		.limit(pageSize)
		.exec((err, adverts) => {
			if(err) {
				return next(err)
			}
			res.json({
				err_code: 0,
				result: adverts
			})
		})
})


router.get('/advert/one/:advertId', (req, res, next) => {
	Advert.findById(req.params.advertId, (err, result) => {
		if (err) {
			return next(err)
		} 
		res.json({
			err_code: 0,
			result: result
		})
	})
})

router.post('/advert/edit', (req, res, next) => {
	Advert.findById(req.body.id, (err, advert) => {
		if (err) {
			return next(err)
		}
		const body = req.body
		advert.title = body.title
		advert.image = body.image
		advert.link = body.link
		advert.start_time = body.start_time
		advert.end_time = body.end_time
		advert.last_modified = Date.now()
		
		advert.save((err, result) => {
			if (err) {
				return next(err)
			}
			res.json({
				err_code: 0
			})

		})
	})
})

router.get('/advert/remove/:advertId', (req, res, next) => {
	Advert.remove({ _id: req.params.advertId }, (err) => {
		if (err) {
			return next(err)
		}
		res.json({
			err_code: 0
		})
	})
})


router.use((req, res, next) => {
	res.end('404...')
})
export default router