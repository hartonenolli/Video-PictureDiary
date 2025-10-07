import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { RecordVideoContainer } from './components/RecordVideoContainer'
import { VideoDiaryContainer } from './components/VideoDiaryContainer'
import {
  Container
} from '@mui/material'

function App() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/api/videos')
      .then(response => {
        setVideos(response.data)
      })
  }, [])

  return (
    <div>
      <Header />
      <Container sx={{ pb: 4 }}>
        <RecordVideoContainer videos={videos} setVideos={setVideos} />
        <VideoDiaryContainer videos={videos} />
      </Container>
    </div>
  )
}

export default App
