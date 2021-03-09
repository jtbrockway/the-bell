import { AppBar, Typography } from '@material-ui/core';
import '../css/Header.css';

function Header() {
  return (
    <div className='Root'>
      <AppBar position="static" className='Appbar' style={{background: 'black'}}>
        <Typography variant="h4">
          The Bell
        </Typography>
      </AppBar>
    </div>
  )
}

export default Header;