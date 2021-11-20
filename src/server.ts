import { parseUrlParam } from './utils/parseUrlParam'
import { exec } from 'child_process'
import { createServer } from 'http'
import { promisify } from 'util'
import { join } from 'path'

const Exec = promisify(exec)

const server = createServer(async (req, res) => {
  try {
    const params = parseUrlParam<{ command: string }>(req.url)
    const command = params?.command || ''
    const [script, args] = command.split(':')

    await Exec(
      `sh ${join(__dirname, `../scripts/${script}.sh`)} ${args
        .split(',')
        .join(' ')}`
    )

    res.end(JSON.stringify({ success: true }))
  } catch (error) {
    console.log(error)
    res.end(JSON.stringify({ success: false }))
  }
})

server.listen(3000, () => console.log('localhost:3000'))
