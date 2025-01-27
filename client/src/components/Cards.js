import * as React from 'react';
import './Cards.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function Cards(props) {
  return (
    
    <Card className='cards' sx={{maxWidth: '300px',}}>
      <CardActionArea >
        <CardMedia
          component="img"
          height="140"
          image={props.img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.heading}
          </Typography>
          <Typography variant="p" color="text.secondary">
            {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small"  color="secondary"  variant="outlined" sx={{}}>
          View Details
        </Button>
      </CardActions>
    </Card>

    
  );
}
