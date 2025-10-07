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

  return (
    <div className="App">
      <h1>VPD Frontend</h1>
      <p>Backend says: {message}</p>
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
