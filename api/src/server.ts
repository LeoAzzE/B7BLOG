import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { mainRoutes } from './routes/main'
import { authRoutes } from './routes/auth'
import { adminRoutes } from './routes/admin'

const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(express.static('public'))

server.use('/api', mainRoutes)
server.use('/api/admin', adminRoutes)
server.use('/api/auth', authRoutes)

server.listen(4444, () => {
    console.log('running backend')
})