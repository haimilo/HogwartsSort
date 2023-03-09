import { SPFI } from "@pnp/sp";
import * as React from "react";
import { useEffect, useState } from "react";
import { getSP } from "../../../pnpConfig";
import CurrentHouse from "./CurrentHouse/CurrentHouse";
import DateTime from "./DateTime/DateTime";
// import styles from "./HogwartsShort.module.scss";
import { IHogwartsShortProps, IStudentData } from "./IHogwartsShortProps";
import UserInfo from "./UserInfo/UserInfo";

const HogwartsShort = (props: IHogwartsShortProps) => {
  const { userDisplayName, userDisplayEmail, context } = props;
  const [_listStudent, _setListStudent] = useState<IStudentData[]>([]);
  const [_currentStudentData, _setCurrentStudentData] =
    useState<IStudentData>();

  let _sp: SPFI = getSP(context);
  const LIST_NAME = "Hogwarts Students";

  const getStudentListData = async () => {
    try {
      const list = await _sp.web.lists();
      const items = await _sp.web.lists.getByTitle(LIST_NAME).items();
      console.log(list);

      _setListStudent(
        items.map((item: IStudentData) => {
          return {
            Id: item.Id,
            Title: item.Title,
            Email: item.Email,
            FullName: item.FullName,
            CurrentHouse: item.CurrentHouse,
            CurrentDateandTime: item.CurrentDateandTime,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentListData();
  }, []);

  useEffect(() => {
    if (_listStudent.length > 0) {
      const currentStudent = _listStudent.filter(
        (student) => student.Email === userDisplayEmail
      );
      _setCurrentStudentData(currentStudent[0]);
    }
  }, [_listStudent]);

  return (
    <div>
      <UserInfo
        userDisplayName={userDisplayName}
        userDisplayEmail={userDisplayEmail}
      />
      <DateTime />
      <CurrentHouse context={context} studentData={_currentStudentData} />
    </div>
  );
};

export default HogwartsShort;
