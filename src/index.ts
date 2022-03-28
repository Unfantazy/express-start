import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { videos } from "./mocks/VideosMock"

const app = express()
app.use(cors())
app.use(bodyParser.json())

const PORT = 5000

app.get('/', (req: Request, res: Response ) => {
    res.send('Hello: World!')
})

app.get('/videos', (req: Request, res: Response ) => {
    res.send(videos)
})

app.get('/videos/:id', (req: Request, res: Response ) => {
    const id = +req.params.id
    const video = videos.find(video => video.id === id) ?? null
    res.send(video ?? 404)
})

app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.send(newVideo)
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
