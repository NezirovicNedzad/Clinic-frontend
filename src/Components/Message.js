import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return <Alert style={{fontSize:"1.3rem"}} variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
  
};

export default Message;
