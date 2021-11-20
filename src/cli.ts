import runInWorkspace from '@saber2pr/cli'
import { join } from 'path'

runInWorkspace({
  name: 'cli',
  libRoot: join(__dirname, '..'),
})
