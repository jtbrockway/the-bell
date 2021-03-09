import { Grid, Box } from '@material-ui/core';
import Games from '../config/gamesConfig.json';
import GameCard from './GameCard';

function GameGrid(props) {
  const games = Games;

  return (
    <Box p={3}>
      <Grid container spacing={3} justify={'center'} >
        {
          games.map((game) => (
            <Grid item xs={12} sm={4} key={game.name}>
              <GameCard
                user={props.user}
                name={game.name} 
                img={game.img} 
              />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );  
}

export default GameGrid;