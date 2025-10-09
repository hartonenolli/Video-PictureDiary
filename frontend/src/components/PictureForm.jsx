import { useState } from 'react'
import { TextField, Button } from '../../node_modules/@mui/material'
import axios from 'axios'

const PictureForm = ({ pictures, setPictures }) => {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const randomUrl = `https://example.com/picture/${Math.random().toString(36).substr(2, 9)}`
    axios.post('http://localhost:8080/api/pictures', { title, url: randomUrl })
      .then(response => {
        setPictures([...pictures, response.data])
        setTitle('')
      })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Picture
      </Button>
    </form>
  )
}

export default PictureForm