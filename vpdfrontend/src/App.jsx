import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8080/api/ping')
      .then(response => {
        setMessage(response.data)
      })
  }, [])

  return (
    <div className="App">
      <h1>VPD Frontend</h1>
      <p>Backend says: {message}</p>
    </div>
  )
}

export default App
