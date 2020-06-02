import React from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import classes from './BuzzItem.module.css';

const BuzzItem = (props) => {
  let imgUrl = 'https://res.cloudinary.com/drsdmoshr/image/upload/v1590491986/pgj1ismv40gb8sqaalfl.jpg';
  return (
    <div className={classes.BuzzItem}>
      <div className={classes.Content}>
        <div className={classes.BuzzDate}>Date</div>
        <div className={classes.BuzzContent}>
          {imgUrl && <a href={imgUrl} target="blank">
            <div 
              title="Click to enlarge"
              className={classes.ImageBlock}
              style={{backgroundImage: `url("${imgUrl}")`}}>
          </div></a>}
          <div className={classes.BuzzOwner}>
            Random user
          </div>
          <div className={classes.Desciption}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea fugit quo sapiente ipsa expedita? Itaque aspernatur iusto maxime suscipit repellat.</div>
        </div>
      </div>
      <div className={classes.ActionRow}>
        <div className={classes.ActionButton}>
         0 <FaThumbsUp className={classes.ActionIcon} title="Like"/>
        </div>
        <div className={classes.ActionButton}>
         0 <FaThumbsDown className={classes.ActionIcon} title="Dislike"/>
        </div>
      </div>
    </div>
  )
}

export default BuzzItem;