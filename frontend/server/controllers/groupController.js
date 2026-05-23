import {
  createGroupProfile,
  getGroupProfile,
  getGroups,
} from '../services/groupService.js'

export async function create(req, res, next) {
  try {
    const response = await createGroupProfile(req.body)
    return res.status(201).json(response)
  } catch (error) {
    return next(error)
  }
}

export async function list(_req, res, next) {
  try {
    const response = await getGroups()
    return res.json(response)
  } catch (error) {
    return next(error)
  }
}

export async function getById(req, res, next) {
  try {
    const response = await getGroupProfile(req.params.groupId)
    return res.json(response)
  } catch (error) {
    return next(error)
  }
}
