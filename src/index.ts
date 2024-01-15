import express from 'express'
import * as fs from 'fs'

interface PakryptStoreNoticeFail {
  ov: 'pakrypt-store.notice:1.0',
  success: false,
  message: string,
}

interface PakryptStoreNoticeSuccessRead {
  ov: 'pakrypt-store.notice:1.0',
  success: true,
  data: string,
}

interface PakryptStoreNoticeSuccessWrite {
  ov: 'pakrypt-store.notice:1.0',
  success: true,
}

const app = express()
app.use(express.text())

const port = 3000

app.use((req, res, next) => {
  const key = req.headers['x-api-key']

  const checkkey = fs.readFileSync('keyfile', {
    encoding: 'utf-8',
  }).trim()

  if (key == checkkey) {
    return next()
  }

  const result: PakryptStoreNoticeFail = {
    ov: 'pakrypt-store.notice:1.0',
    success: false,
    message: 'Invalid API Key',
  }
  res.send(result)
})

app.get('/', (req, res) => {
  const data = fs.readFileSync('datafile', {
    encoding: 'utf-8',
  })

  const result: PakryptStoreNoticeSuccessRead = {
    ov: 'pakrypt-store.notice:1.0',
    success: true,
    data: data,
  }
  res.send(result)
})

app.post('/', (req, res) => {
  if (typeof req.body != 'string') {
    const result: PakryptStoreNoticeFail = {
      ov: 'pakrypt-store.notice:1.0',
      success: false,
      message: 'Invalid Request Body',
    }
    return res.send(result)
  }

  fs.writeFileSync('datafile', req.body, {
    encoding: 'utf-8',
  })

  const result: PakryptStoreNoticeSuccessWrite = {
    ov: 'pakrypt-store.notice:1.0',
    success: true,
  }
  res.send(result)
})

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(err)

  const result: PakryptStoreNoticeFail = {
    ov: 'pakrypt-store.notice:1.0',
    success: false,
    message: 'Error Handling Request',
  }
  res.send(result)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
