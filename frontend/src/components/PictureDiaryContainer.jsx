import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '../../node_modules/@mui/material'

export const PictureDiaryContainer = ({ pictures }) => {
  console.log('pictures:', pictures);
  if (!pictures || pictures.length === 0) {
    return <div>No pictures to display.</div>;
  }
    return (
      <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableBody>
        {pictures.map(picture => (
          <TableRow key={picture.id}>
          <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
            {picture.title}
            {picture.url && (
              <div>
                <img
                  src={`http://localhost:8080/${picture.url}`}
                  alt={picture.title}
                  style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
                />
              </div>
            )}
          </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
      </TableContainer>
    )
  }