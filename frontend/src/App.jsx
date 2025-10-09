import { useEffect, useState } from 'react'
import { fetchPictures } from './routes/Routes'
import { Header } from './components/Header'
import { RecordVideoContainer } from './components/RecordVideoContainer'
import { PictureDiaryContainer } from './components/PictureDiaryContainer'
import {
  Container
} from '../node_modules/@mui/material'

function App() {
  const [pictures, setPictures] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const pictures = await fetchPictures();
      setPictures(pictures);
      console.log('Fetched pictures:', pictures);
    };
    fetchData();
  }, [])

  return (
    <div>
      <Header />
      <Container sx={{ pb: 4 }}>
        <RecordVideoContainer pictures={pictures} setPictures={setPictures} />
        <PictureDiaryContainer pictures={pictures} />
      </Container>
    </div>
  )
}

export default App
