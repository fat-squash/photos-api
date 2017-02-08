import crypto from 'crypto'
// import uuidV1 from 'uuid/v1'
// const hash = uuidV1()

const secret = 'photos'
const hash = crypto
  .createHmac('sha256', secret)
  .update(new Date().toString())
  .digest('hex')

export default function genHash() {
  const secret = 'photos'
  const hash = crypto
    .createHmac('sha256', secret)
    .update(new Date().toString())
    .digest('hex')
  return hash
}
