import React from 'react';
import clsx from 'clsx';
import { 
  Card, 
  CardMedia,
  CardActions, 
  IconButton,
  Collapse,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Users from '../config/usersConfig.json'
import endpoints from '../config/endpointsConfig.js';

const useStyles = makeStyles((theme) => ({
  cardActions: {
    marginLeft: "45%",
    justifyContent: 'space-between'
  },
  media: {
    height: '100%',
  },
  margin: {
    margin: theme.spacing(1),
  },
  mentions: {
    marginLeft: theme.spacing(2)
  }
}));

function GameCard(props) {
  const classes = useStyles();
  
  const [disableBell, setDisableBell] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [mentions, setMentions] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddMention = (username) => {
    return (mentions.includes(username) 
      ? setMentions(mentions.filter(user => user !== username)) 
      : setMentions(oldMentions => [...oldMentions, username]));
  };

  const ringBell = () => {
    const messageMention = (mentions.length 
      ? Users.filter(user => mentions.includes(user.name)).map(user => user.mention).join(' ')
      : Users.filter(user => user.name === "Core")[0].mention
    );

    const data = JSON.stringify({
      message: messageMention,
      game: props.game.name,
      ringer: props.user,
      slots: props.game.slots,
      img: props.game.img
    });

    setDisableBell(true);
    fetch(
      `${endpoints.BELL_API}/ringBell`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }
    );
  }

  return (
    <div>
      <Card>
        <CardMedia 
          className={classes.media}
          component="img" 
          src={props.game.img} 
          title={props.game.name}
        />
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton aria-label="Ring the Bell" disabled={disableBell} onClick={ringBell}>
            <NotificationsActiveIcon />
          </IconButton>
          <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto">
            <Typography variant="h6" color="primary" gutterBottom={true} align="center">
              Select users to mention
            </Typography>
          <Grid container justify={'center'} className={classes.mentions}>
            {
              Users.filter(user => user.name !== "Core" && user.name !== props.user)
              .map(user => (
                <Grid item xs={12} sm={3} key={user.name}>
                  <Button
                    className={classes.margin}
                    variant="outlined"
                    size="large"
                    style={{textAlign:'center', width:"65%"}}
                    color={mentions.includes(user.name) ? 'primary' : 'secondary'}
                    onClick={() => {handleAddMention(user.name)}}
                  >
                    {user.name}
                  </Button>
                </Grid>
              ))
            }
          </Grid>
        </Collapse>
      </Card>
    </div>
  );
}

export default GameCard;