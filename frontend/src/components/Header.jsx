import { AppBar, Toolbar, Typography } from "../../node_modules/@mui/material"

export const Header = () => {
    return (
      <div style={{ paddingBottom: '20px' }}>
      <AppBar
        position='static'
        sx={{
        borderRadius: 2,
        boxShadow: 3,
        overflow: 'hidden'
        }}
      >
        <Toolbar>
        <Typography
          variant='h6'
          sx={{ flexGrow: 1 }}
          textAlign='center'
        >
          Video-Picture Diary
        </Typography>
        </Toolbar>
      </AppBar>
      </div>
    )}
