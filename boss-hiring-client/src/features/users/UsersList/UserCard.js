import React from "react";
import PropTypes from "prop-types";
import { Card, WingBlank, WhiteSpace } from "antd-mobile";

function UserCard(props) {
  const user = props.user;

  return (
    <div>
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <Card>
          <Card.Header
            title={user.username}
            thumb={user.avatar}
            extra={user.username}
          />
          <Card.Body>
            <div>Job: {user.title}</div>
            {user.company ? <div>Company: {user.company}</div> : null}
            {user.salary ? <div>Salary: {user.salary}</div> : null}
            <div>Info: {user.info}</div>
          </Card.Body>
        </Card>
        <WhiteSpace size="lg" />
      </WingBlank>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};
export default UserCard;
