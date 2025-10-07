import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material'

export const VideoDiaryContainer = ({ videos }) => {
    return (
      <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableBody>
        {videos.map(video => (
          <TableRow key={video.id}>
          <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
            {video.title}
          </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
      </TableContainer>
    )
  }