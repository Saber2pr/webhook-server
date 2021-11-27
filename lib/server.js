'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const parseUrlParam_1 = require('./utils/parseUrlParam')
const child_process_1 = require('child_process')
const http_1 = require('http')
const util_1 = require('util')
const path_1 = require('path')
const uuid_1 = require('./uuid')
const Exec = (0, util_1.promisify)(child_process_1.exec)
const parseDeployParams = (deploy = '') => {
  const [image, port, token] = deploy.split(',')
  const [image_name, tag] = image.split(':')
  return {
    image_name,
    tag,
    port,
    token,
  }
}
const server = (0, http_1.createServer)(async (req, res) => {
  try {
    const secret = await (0, uuid_1.readUuid)()
    const params = (0, parseUrlParam_1.parseUrlParam)(req.url)
    //  image_name:tag,out-port:inner-port,token
    const deploy =
      (params === null || params === void 0 ? void 0 : params.deploy) || ''
    const { image_name, tag, port, token } = parseDeployParams(deploy)
    if (token !== secret) {
      res.end('forbidden')
    }
    // run shell
    await Exec(
      `sh ${(0, path_1.join)(
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
