import { parseUrlParam } from './utils/parseUrlParam'
import { exec } from 'child_process'
import { createServer } from 'http'
import { promisify } from 'util'

const Exec = promisify(exec)

const server = createServer(async (req, res) => {
  let std: {
    stdout: string
    stderr: string
  }
  try {
    const params = parseUrlParam<{ command: string; args: string }>(req.url)
    const command = params?.command || ''
    const args = params?.args || ''
    std = await Exec(`yarn cli ${command} ${args.split(',').join(' ')}`)

    res.end(JSON.stringify({ success: true, result: std }))
  } catch (error) {
    console.log(error)
    res.end(JSON.stringify({ success: false, result: std }))
  }
})

server.listen(3000, () => console.log('localhost:3000'))
