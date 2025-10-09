import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '../../node_modules/@mui/material'

export const PictureDiaryContainer = ({ pictures }) => {
    return (
      <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableBody>
        {pictures.map(picture => (
          <TableRow key={picture.id}>
          <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
            {picture.title}
          </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
      </TableContainer>
    )
  }