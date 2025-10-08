import { useState } from 'react'
import { TextField, Button } from '../../node_modules/@mui/material'
import axios from 'axios'

const VideoForm = ({ videos, setVideos }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Generate a random URL for the video
    const randomUrl = `https://example.com/video/${Math.random().toString(36).substr(2, 9)}`
    axios.post('http://localhost:8080/api/videos', { title, url: randomUrl })
      .then(response => {
        setVideos([...videos, response.data])
        setTitle('')
        setUrl('')
      })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Video
      </Button>
    </form>
  )
}

export default VideoForm