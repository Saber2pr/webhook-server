import { readFile, writeFileSync } from 'fs'
import { join } from 'path'
import { promisify } from 'util'

import { random } from '@saber2pr/utils'

const secretPath = join(__dirname, '../secret.txt')

export const updateUuid = () => writeFileSync(secretPath, random.uuid())

export const readUuid = async () => {
  const buf = await promisify(readFile)(secretPath)
  return buf.toString()
}
