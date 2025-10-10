import CameraComponent from "./CameraComponent"
import { useState } from "react"
import { TextField, Button, Box, Typography } from "@mui/material"
import axios from "axios"

const PictureForm = ({ pictures, setPictures, snapshot, setSnapshot }) => {
  const [title, setTitle] = useState("")
  const [file, setFile] = useState(null)
  const [mode, setMode] = useState("none")

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("title", title)

      if (snapshot) {
        const res = await fetch(snapshot)
        const blob = await res.blob()
        formData.append("file", blob, `${Date.now()}.png`)
      } else if (file) {
        formData.append("file", file)
      } else {
        formData.append(
          "url",
          `https://example.com/picture/${Math.random().toString(36).substr(2, 9)}`
        )
      }

      const response = await axios.post("http://localhost:8080/api/pictures", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setPictures([...pictures, response.data])
      setTitle("")
      setSnapshot(null)
      setFile(null)
      setMode("none")
    } catch (err) {
      console.error("Error uploading picture:", err)
    }
  }

  const canSubmit =
    title.trim().length > 0 && (snapshot !== null || file !== null)

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        variant="outlined"
      />

      {mode === "none" && (
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setMode("camera")}
          >
            Take a Picture
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => setMode("upload")}
          >
            Upload File
          </Button>
        </Box>
      )}

      {mode === "camera" && (
        <>
          <CameraComponent snapshot={snapshot} setSnapshot={setSnapshot} />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setSnapshot(null)
                setMode("none")
              }}
            >
              Back to Selection
            </Button>
          </Box>
        </>
      )}


      {mode === "upload" && (
        <Box sx={{ textAlign: "center" }}>
          {!file ? (
            <input type="file" accept="image/*" onChange={handleFileChange} />
          ) : (
            <Box>
              <Typography variant="body2">{file.name}</Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={handleRemoveFile}
                sx={{ mt: 1 }}
              >
                Remove File
              </Button>
            </Box>
          )}

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setFile(null)
              setMode("none")
            }}
            sx={{ mt: 2 }}
          >
            Cancel Upload
          </Button>
        </Box>
      )}

      {mode !== "none" && (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!canSubmit}
          sx={{ mt: 2 }}
        >
          {snapshot ? "Save Snapshot" : "Upload Picture"}
        </Button>
      )}
    </Box>
  )
}

export default PictureForm
