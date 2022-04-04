import { videos } from "./db"

export const videosRepository = {
    getVideos() {
       return videos
    },
    getVideoById(id: number) {
        return videos.find(video => video.id === id) ?? null
    },
    deleteVideoById(id: number) {
        const newVideos = videos.filter(video => video.id !== id)
        if (newVideos.length < videos.length) {
            // @ts-ignore
            videos = newVideos
            return true
        }
        return false
    },
    updateVideoById(id: number, title: string) {
        const video = videos.find(video => video.id === id)

        if (!video) return false

        video.title = title
        return true
    },
    createVideo(title: string) {
        const newVideo = {
            id: +(new Date()),
            title,
            author: 'it-incubator.eu'
        }
        videos.push(newVideo)

        return newVideo
    }
}