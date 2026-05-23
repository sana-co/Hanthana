import { randomUUID } from 'node:crypto'
import { createHttpError } from '../models/errorModel.js'
import { validateCreateGroupPayload } from '../models/groupModel.js'
import {
  createGroup,
  findGroupById,
  findGroupByTag,
  listGroups,
} from '../repositories/groupRepository.js'

export async function createGroupProfile(payload) {
  const validatedPayload = validateCreateGroupPayload(payload)
  const existingGroup = await findGroupByTag(validatedPayload.groupTag)

  if (existingGroup) {
    throw createHttpError(409, 'Group tag already exists.')
  }

  const createdAt = new Date().toISOString()
  const group = {
    id: randomUUID(),
    groupName: validatedPayload.groupName,
    groupTag: validatedPayload.groupTag,
    description: validatedPayload.description,
    focus: validatedPayload.focus,
    focusItems: validatedPayload.focusItems,
    privacy: validatedPayload.privacy,
    rules: validatedPayload.rules,
    createdByName: validatedPayload.createdByName,
    createdByTag: validatedPayload.createdByTag,
    createdAt,
    membersCount: 1,
    channelsCount: 0,
    coverImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
  }

  const savedGroup = await createGroup(group)

  return {
    message: 'Group created successfully.',
    group: savedGroup,
  }
}

export async function getGroupProfile(groupId) {
  const group = await findGroupById(groupId)

  if (!group) {
    throw createHttpError(404, 'Group not found.')
  }

  return { group }
}

export async function getGroups() {
  const groups = await listGroups()
  return { groups }
}
