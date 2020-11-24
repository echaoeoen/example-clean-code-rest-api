import express from 'express'
import { ConfigProvider } from '../../config/provider'
import { Manager } from '../../core/manager'
import { PersonController, params as personParams } from './controllers/person'
import bodyParser from 'body-parser'
import middlewareLogger from './middlewares/middleware-logger'
import middlwareSimpleAuth from './middlewares/simple-auth'
import fileUpload from 'express-fileupload'

const path = {
  persons: `/persons`,
  idPersons: `/persons/:${personParams.id}`,
  imagePersons: `/persons/:${personParams.id}/image`,
}

export const Router = function(m: Manager, c: ConfigProvider) {
  const router = express.Router()
  
  const personController = PersonController(m, c)
  
  router.use(bodyParser.json())
  
  router.use( 
    middlewareLogger(c.logger(), {
      logType: 'full'
    }))
  
  router.use(
    middlwareSimpleAuth()
  )
  router.get(path.persons, personController.fetch)

  router.get(path.idPersons, personController.get)
  router.patch(path.idPersons, personController.update)
  router.delete(path.idPersons, personController.delete)
  router.post(path.persons, personController.insert)

  router.patch(path.imagePersons, fileUpload(),  personController.uploadImage)
  router.get(path.imagePersons, personController.getImage)

  router.get('/', (req, res) => res.send(`welcome to my app`))
  return router
}