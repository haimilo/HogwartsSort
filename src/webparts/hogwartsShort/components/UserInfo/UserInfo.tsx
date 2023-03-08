import * as React from "react";
import { IUserInfo } from "./IUserInfor";

const UserInfo = (props: IUserInfo) => {
  return (
    <div>
      <h1>Current Student Information:</h1>
      <p>
        <strong>Name:</strong> {props.userDisplayName}
      </p>
      <p>
        <strong>Email:</strong> {props.userDisplayEmail}
      </p>
      <hr />
    </div>
  );
};

export default UserInfo;
