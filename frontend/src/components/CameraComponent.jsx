import camera from "../utils/camera"
import { Button } from "@mui/material"
import { useRef, useEffect, useState } from "react"

const CameraComponent = ({ snapshot, setSnapshot }) => {
  const videoRef = useRef(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  const buttonStyle = {
    mt: 2,
    mb: 2,
    bgcolor: "purple",
    color: "black",
    "&:hover": { bgcolor: "#FFD700" },
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
      setSnapshot(imgData)
      setIsCameraOpen(false)
    }
  }

  const handleRetake = () => {
    setSnapshot(null)
    setIsCameraOpen(true)
  }

  const handleClose = () => {
    setSnapshot(null)
    setIsCameraOpen(false)
  }

  return (
    <div style={{ textAlign: "center" }}>
      {!isCameraOpen && !snapshot && (
        <Button onClick={() => setIsCameraOpen(true)} variant="contained" sx={buttonStyle}>
          Open Camera
        </Button>
      )}

      {isCameraOpen && (
        <>
          <video
            ref={videoRef}
            width={320}
            height={240}
            autoPlay
            style={{ border: "2px solid #333", background: "#000", display: "block", margin: "auto", marginTop: "16px", marginBottom: "16px" }}
          />
          <Button onClick={handleSnapshot} variant="contained" sx={buttonStyle}>
            Take Snapshot
          </Button>
          <Button onClick={() => setIsCameraOpen(false)} variant="contained" sx={buttonStyle}>
            Close Camera
          </Button>
        </>
      )}

      {snapshot && (
        <img
          src={snapshot}
          alt="Snapshot"
          style={{ border: "2px solid #333", display: "block", margin: "20px auto", width: 320, height: 240 }}
        />
      )}
      {snapshot && (
        <>
          <Button onClick={handleRetake} variant="contained" sx={buttonStyle}>
            Retake
          </Button>
          <Button onClick={handleClose} variant="contained" sx={buttonStyle}>
            Remove Snapshot
          </Button>
        </>
      )}
    </div>
  )
}

export default CameraComponent