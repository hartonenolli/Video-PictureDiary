import VideoForm from "./VideoForm"
import Camera from "../utils/Camera"
import { AppBar, Typography, Card } from "../../node_modules/@mui/material"

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
                sx={{
                    flexGrow: 1,
                    textAlign: 'center',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Camera />
                </div>
                Record 10 seconds of video and save it to your diary!
            </Typography>
            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, width: '100%' }}>
                <VideoForm videos={videos} setVideos={setVideos} />
            </Card>
        </AppBar>
    )
}