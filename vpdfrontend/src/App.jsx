import axios from 'axios'
import { useEffect, useState } from 'react'
import VideoForm from './components/VideoForm'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Card,
} from '@mui/material'

function App() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/api/videos')
      .then(response => {
        setVideos(response.data)
      })
  }, [])

  const Header = () => {
    return (
      <div style={{ paddingBottom: '20px' }}>
      <AppBar
        position='static'
        sx={{
        borderRadius: 2,
        boxShadow: 3,
        overflow: 'hidden'
        }}
      >
        <Toolbar>
        <Typography
          variant='h6'
          sx={{ flexGrow: 1 }}
          textAlign='center'
        >
          Video-Picture Diary
        </Typography>
        </Toolbar>
      </AppBar>
      </div>
    )}
  
  const RecordVideoContainer = () => {
    return (
      <AppBar
        position='static'
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          overflow: 'hidden',
          alignItems: 'center',
          paddingBottom: '20px',
          mb: 3
        }}
      >
        <Typography
          variant='h6'
          sx={{ flexGrow: 1, textAlign: 'center', width: '100%' }}
        >
          This is the place to put the video recording functionality
        </Typography>
        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, width: '100%' }}>
          <VideoForm videos={videos} setVideos={setVideos} />
        </Card>
      </AppBar>
    )
  }

  const VideoDiaryContainer = ({ videos }) => {
    return (
      <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableBody>
        {videos.map(video => (
          <TableRow key={video.id}>
          <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
            {video.title}
          </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
      </TableContainer>
    )
  }

  return (
    <div>
      <Header />
      <Container sx={{ pb: 4 }}>
        <RecordVideoContainer />
        <VideoDiaryContainer videos={videos} />
      </Container>
    </div>
  )
}

export default App
