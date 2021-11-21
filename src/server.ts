import { parseUrlParam } from './utils/parseUrlParam'
import { exec } from 'child_process'
import { createServer } from 'http'
import { promisify } from 'util'
import { join } from 'path'

const Exec = promisify(exec)

const parseDeployParams = (deploy: string = '') => {
  const [image, port] = deploy.split(',')
  const [image_name, tag] = image.split(':')
  return {
    image_name,
    tag,
    port,
  }
}

const server = createServer(async (req, res) => {
  try {
    const params = parseUrlParam<{ deploy: string }>(req.url)
    //  image_name:tag,out-port:inner-port
    const deploy = params?.deploy || ''

    const { image_name, tag, port } = parseDeployParams(deploy)

    // run shell
    await Exec(
      `sh ${join(
        __dirname,
        `../scripts/docker-deploy.sh`
      )} ${image_name} ${tag} ${port}`
    )

    res.end(JSON.stringify({ success: true }))
  } catch (error) {
    console.log(error)
    res.end(JSON.stringify({ success: false }))
  }
})

server.listen(3000, () => console.log('localhost:3000'))
