import PictureForm from "./PictureForm"
import CameraComponent from "./CameraComponent"
import { AppBar, Typography, Card } from "@mui/material"
import { useState } from "react"

export const AddPictureContainer = ({ pictures, setPictures }) => {
  const [snapshot, setSnapshot] = useState(null)

  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        alignItems: "center",
        paddingBottom: "20px",
        mb: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          flexGrow: 1,
          textAlign: "center",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      <Card sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 2, width: "100%", marginTop: 2, marginBottom: 2 }}>
        <PictureForm
          pictures={pictures}
          setPictures={setPictures}
          snapshot={snapshot}
          setSnapshot={setSnapshot}
        />
      </Card>
        {/* <CameraComponent snapshot={snapshot} setSnapshot={setSnapshot} /> */}

        <Typography variant="body1" sx={{ m: 1 }}>
          Take a picture or upload an existing one to make a video diary entry!
        </Typography>
      </Typography>

    </AppBar>
  )
}
