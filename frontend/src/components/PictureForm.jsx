import { useState } from "react"
import { TextField, Button } from "@mui/material"
import axios from "axios"

const PictureForm = ({ pictures, setPictures, snapshot, setSnapshot }) => {
  const [title, setTitle] = useState("")
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("title", title)

      if (snapshot) {
        const res = await fetch(snapshot)
        const blob = await res.blob()
        formData.append("file", blob, `${Date.now()}.png`)
      } else {
        formData.append("url", `https://example.com/picture/${Math.random().toString(36).substr(2, 9)}`)
      }

      const response = await axios.post("http://localhost:8080/api/pictures", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setPictures([...pictures, response.data])
      setTitle("")
      setSnapshot(null)
    } catch (err) {
      console.error("Error uploading picture:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        {snapshot ? "Save Snapshot" : "Download Picture"}
      </Button>
    </form>
  )
}

export default PictureForm
