import {Request, Response, Router} from 'express'
import { inputValidatorMiddleware } from '../middlewares/input-validator-middleware'
import { videosRepository } from '../repositories/videos-repositories'

// put here array with videos
export const videosRouter = Router({})

videosRouter
// GET ALL VIDEOS
.get('/', (req: Request, res: Response ) => {
    res.send(videosRepository.getVideos())
})
// GET VIDEO BY ID
.get('/:id', (req: Request, res: Response ) => {
    const id = +req.params.id
    const video = videosRepository.getVideoById(id)
    res.send(video ?? 404)
})
// CREATE VIDEO
.post('/',
    inputValidatorMiddleware,
    (req: Request, res: Response) => {
    const { title } = req.body

    if (!title) {
        res.send(400)
        return
    }

    const videos = videosRepository.createVideo(title)
    res.send(videos)
})
// DELETE VIDEO
.delete('/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const isDeleted = videosRepository.deleteVideoById(id)

    if (!isDeleted) {
        res.send(404)
        return
    }

    res.send(204)
})
// UPDATE VIDEO
.put('/:videoId', (req: Request, res: Response ) => {
    const id = +req.params.videoId
    const { title } = req.body

    const isUpdated = videosRepository.updateVideoById(id, title)

    if (!isUpdated || !id) {
        res.send(404)
        return
    }

    res.send(204)
})