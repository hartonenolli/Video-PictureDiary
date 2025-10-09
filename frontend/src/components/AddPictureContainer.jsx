import PictureForm from "./PictureForm"
import CameraComponent from "./CameraComponent"
import { AppBar, Typography, Card } from "../../node_modules/@mui/material"

export const AddPictureContainer = ({ pictures, setPictures }) => {

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
                <CameraComponent />
                <Typography variant="body1" sx={{ m: 1 }}>
                    Take a picture or upload an existing one to make a video diary entry!
                </Typography>
            </Typography>
            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, width: '100%' }}>
                <PictureForm pictures={pictures} setPictures={setPictures} />
            </Card>
        </AppBar>
    )
}