import camera from "../utils/camera"
import { Button } from "@mui/material"
import { useRef, useEffect, useState } from "react"

const CameraComponent = () => {
  const videoRef = useRef(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  const buttonStyle = {
    mt: 2,
    mb: 2,
    bgcolor: "purple",
    color: "black",
    "&:hover": { bgcolor: "#FFD700" }
  }

  useEffect(() => {
    if (isCameraOpen) {
      camera.startCamera(videoRef.current, 320, 240)
    } else {
      camera.stopCamera(videoRef.current)
    }
  }, [isCameraOpen])

  const handleSnapshot = () => {
    const imgData = camera.takeSnapshot(videoRef.current)
    if (imgData) {
      const link = document.createElement("a")
      link.href = imgData
      link.download = "snapshot.png"
      link.click()
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      {!isCameraOpen ? (
        <Button onClick={() => setIsCameraOpen(true)} variant="contained" sx={buttonStyle}>
          Open Camera
        </Button>
      ) : (
        <>
          <video
            ref={videoRef}
            width={320}
            height={240}
            autoPlay
            style={{ border: "2px solid #333", background: "#000", display: "block", margin: "auto" }}
          />
          <Button
            onClick={() => setIsCameraOpen(false)}
            variant="contained"
            sx={buttonStyle}
          >
            Close Camera
          </Button>
          <Button onClick={handleSnapshot} variant="contained" sx={buttonStyle}>
            Take Snapshot
          </Button>
        </>
      )}
    </div>
  )
}

export default CameraComponent