import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/api/ping')
      .then(response => {
        setMessage(response.data)
      })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8080/api/videos')
      .then(response => {
        setVideos(response.data)
      })
  }, [])

  const VideoForm = () => {
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

  return (
    <div className="App">
      <h1>VPD Frontend</h1>
      <p>Backend says: {message}</p>
      <VideoForm />
      <h2>Videos</h2>
      <ul>
        {videos.map(video => (
          <li key={video.id}>{video.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
