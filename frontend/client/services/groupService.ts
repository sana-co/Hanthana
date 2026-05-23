import { getJson, postJson } from './api'

export type Group = {
  id: string
  groupName: string
  groupTag: string
  description: string
  focus: string
  focusItems: string[]
  privacy: string
  rules: string
  createdByName: string
  createdByTag: string
  createdAt: string
  membersCount: number
  channelsCount: number
  coverImage: string
}

type ListGroupsResponse = {
  groups: Group[]
}

type GroupResponse = {
  group: Group
}

type CreateGroupResponse = {
  message: string
  group: Group
}

type CreateGroupRequest = {
  groupName: string
  groupTag: string
  description: string
  focus: string
  privacy: string
  rules: string
  createdByName: string
  createdByTag: string
}

export function listGroups() {
  return getJson<ListGroupsResponse>('/groups')
}

export function getGroup(groupId: string) {
  return getJson<GroupResponse>(`/groups/${groupId}`)
}

export function createGroup(body: CreateGroupRequest) {
  return postJson<CreateGroupResponse>('/groups', body)
}
