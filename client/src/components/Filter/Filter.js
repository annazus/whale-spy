import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import InfoIcon from "@material-ui/icons/InfoRounded";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";

const Filter = ({ title, list, handleToggle, selectedValues }) => {
  console.log(selectedValues);
  return (
    <div>
      <ExpansionPanel expanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}>
          <Typography>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            {list.map(({ name, val, helpUrl }, indx) => {
              console.log(selectedValues, val);
              return (
                <ListItem key={indx} onClick={() => handleToggle(val)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedValues.includes(val)}
                      value={val}
                      inputProps={{
                        "aria-label": "primary checkbox"
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText id={val} primary={`${name}`} />
                  {helpUrl ? (
                    <ListItemSecondaryAction>
                      <Link
                        edge="end"
                        aria-label="info"
                        href={helpUrl}
                        target="_blank"
                        rel="noopener"
                      >
                        <InfoIcon />
                      </Link>
                    </ListItemSecondaryAction>
                  ) : null}
                </ListItem>
              );
            })}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export { Filter as default };
