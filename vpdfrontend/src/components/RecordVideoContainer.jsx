import VideoForm from "./VideoForm"
import { AppBar, Typography, Card } from "@mui/material"

export const RecordVideoContainer = ({ videos, setVideos }) => {
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