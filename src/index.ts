import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const PORT = 5000

let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

app.get('/', (req: Request, res: Response ) => {
    res.send('Hello: World!')
})

app.get('/videos', (req: Request, res: Response ) => {
    res.send(videos)
})

app.get('/videos/:id', (req: Request, res: Response ) => {
    const id = +req.params.id
    const video = videos.find(video => video.id === id) ?? null
    res.send(video ?? 400)
})

app.post('/videos', (req: Request, res: Response) => {
    if (!req.body.title) {
        res.send(400)
    }

    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.send(newVideo)
})

app.delete('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const newVideos = videos.filter(video => video.id !== id)
    if (newVideos.length < videos.length) {
        videos = newVideos
        res.send(204)
    }
    res.send(404)
})

app.put('/videos/:videoId', (req: Request, res: Response ) => {
    const id = +req.params.videoId
    const video = videos.find(video => video.id === id) ?? null

    if (!video || !id) {
        res.send(400)
        return
    }

    video.title = req.body.title
    res.send(204)
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
