import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));
const Comment = ({ comment }) => {
  const { id, text, author, createdAt } = comment;
  return (
    <>
      <ListItem key={id} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={author.name} src={author.picture}></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={author.name}
          secondary={
            <>
              <Typography variant="body2">
                {new Date(createdAt).toLocaleString()}
              </Typography>
              {text}
            </>
          }
        ></ListItemText>
      </ListItem>
      <Divider></Divider>
    </>
  );
};
const CommentsList = ({ commentsList }) => {
  const classes = useStyles();

  console.log(commentsList);
  const content = () => {
    return commentsList.map(comment => <Comment comment={comment} />);
  };
  console.log(content());
  return <List className={classes.root}>{content()}</List>;
};
export default CommentsList;
