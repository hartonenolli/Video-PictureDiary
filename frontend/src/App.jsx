import { useEffect, useState } from 'react'
import { fetchVideos } from './utils/Routes'
import { Header } from './components/Header'
import { RecordVideoContainer } from './components/RecordVideoContainer'
import { VideoDiaryContainer } from './components/VideoDiaryContainer'
import {
  Container
} from '../node_modules/@mui/material'

function App() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const videos = await fetchVideos();
      setVideos(videos);
    };
    fetchData();
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
