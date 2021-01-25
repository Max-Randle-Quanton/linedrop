import { Card, CardContent, Divider, Typography } from "@material-ui/core";
import React from "react";

const GroupPreviewCard = (props) => {
  const { members, messages } = props;

  return (
    <Card>
      <CardContent>
        <Typography>{members.join(", ")}</Typography>
      </CardContent>
      <Divider />
      <CardContent>
        {messages.map((msg) => (
          <Typography>{msg.text}</Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default GroupPreviewCard;
