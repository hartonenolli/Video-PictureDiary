import { useState } from 'react'
import axios from 'axios'

const VideoForm = ({ videos, setVideos }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8080/api/videos', { title, url })
      .then(response => {
        setVideos([...videos, response.data])
        setTitle('')
        setUrl('')
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit">Add Video</button>
    </form>
  )
}

export default VideoForm