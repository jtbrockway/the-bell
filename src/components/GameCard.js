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
    if(mentions.includes(username)) {
      setMentions(mentions.filter(user => user !== username));
      return;
    }
    setMentions(oldMentions => [...oldMentions, username]);
  };

  const ringBell = () => {
    const messageMention = mentions.length 
      ? Users.filter(user => mentions.includes(user.name)).map(user => user.mention).join(' ')
      : Users.filter(user => user.name === "Core")[0].mention;
    const message = `${messageMention} ${props.user} has rung the bell for ${props.name}`;

    setDisableBell(true);

    console.log(process.env.REACT_APP_DISCORD_WEBHOOK);
    fetch(
      process.env.REACT_APP_DISCORD_WEBHOOK,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message
        }),
      }
    );
  }

  return (
    <div>
      <Card>
        <CardMedia 
          className={classes.media}
          component="img" 
          src={props.img} 
          title={props.name}
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