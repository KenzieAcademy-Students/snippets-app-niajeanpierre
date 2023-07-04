import express from 'express'
import authRouter from './auth'
import userRouter from './users'
import postRouter from './posts'
import uploadRouter from "./fileupload"

const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send('api endpoint')
})

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/posts', postRouter)
router.use("/upload", uploadRouter)

module.exports = router
