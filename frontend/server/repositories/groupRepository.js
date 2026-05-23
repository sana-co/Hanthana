import { promises as fs } from 'node:fs'
import path from 'node:path'

const groupsFilePath = path.resolve(process.cwd(), 'server/data/groups.json')

async function readGroups() {
  const fileContents = await fs.readFile(groupsFilePath, 'utf8')
  return JSON.parse(fileContents)
}

async function writeGroups(groups) {
  await fs.writeFile(groupsFilePath, JSON.stringify(groups, null, 2))
}

export async function createGroup(group) {
  const groups = await readGroups()
  groups.unshift(group)
  await writeGroups(groups)
  return group
}

export async function findGroupById(id) {
  const groups = await readGroups()
  return groups.find((group) => group.id === id) || null
}

export async function findGroupByTag(groupTag) {
  const groups = await readGroups()
  return groups.find((group) => group.groupTag === groupTag) || null
}

export async function listGroups() {
  return readGroups()
}
