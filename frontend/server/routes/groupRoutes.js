import { Router } from 'express'
import { create, getById, list } from '../controllers/groupController.js'

const router = Router()

router.get('/', list)
router.get('/:groupId', getById)
router.post('/', create)

export default router
