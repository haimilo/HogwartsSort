import { Button } from "@mui/material";
import { SPFI } from "@pnp/sp";
import * as React from "react";
import { useEffect, useState } from "react";
import { getSP } from "../../../../pnpConfig";
import { ICurrentHouse } from "./ICurrentHouse";

const HouseList = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

const CurrentHouse = (props: ICurrentHouse) => {
  const { studentData, context } = props;
  const [currentHouse, _setCurrentHouse] = useState<string>(
    studentData && studentData.CurrentHouse ? studentData.CurrentHouse : ""
  );

  let _sp: SPFI = getSP(context);
  const LIST_NAME = "Hogwarts Students";

  const [_isSortHouse, _setIsSortHouse] = useState<boolean>(false);

  const handleRandomHouse = () => {
    const randomHouse = HouseList[Math.floor(Math.random() * HouseList.length)];
    const isSameHouse = randomHouse === currentHouse;
    if (isSameHouse) {
      handleRandomHouse();
    }
    _setCurrentHouse(randomHouse);
    _setIsSortHouse(true);
  };

  const UpdateStudentHouse = async () => {
    try {
      await _sp.web.lists
        .getByTitle(LIST_NAME)
        .items.getById(studentData.Id)
        .update({
          CurrentHouse: currentHouse,
          CurrentDateandTime: new Date(),
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    UpdateStudentHouse();
  }, [currentHouse]);

  useEffect(() => {
    if (studentData && studentData.CurrentHouse) {
      _setCurrentHouse(studentData.CurrentHouse);
    }
  }, [studentData]);

  return (
    <div>
      <h1>Current House:</h1>
      <p>
        {currentHouse ? (
          <>
            <span>You will be sorted into:</span>
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {` ${currentHouse}`}
            </span>
          </>
        ) : (
          "You are not belong to any house yet."
        )}
      </p>
      <div>
        {currentHouse ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRandomHouse}
          >
            Change House
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleRandomHouse}
          >
            Join House
          </Button>
        )}
      </div>
    </div>
  );
};

export default CurrentHouse;
