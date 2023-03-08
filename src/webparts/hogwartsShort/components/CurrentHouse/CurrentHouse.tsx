import { Button } from "@mui/material";
import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RandomReveal } from "react-random-reveal";
import { ICurrentHouse } from "./ICurrentHouse";

const HouseList = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

const CurrentHouse = (props: ICurrentHouse) => {
  const { studentData } = props;
  const [currentHouse, _setCurrentHouse] = useState<string>(
    studentData && studentData.CurrentHouse ? studentData.CurrentHouse : ""
  );
  console.log("currentHouse", currentHouse);

  const [_isSortHouse, _setIsSortHouse] = useState<boolean>(false);

  const handleRandomHouse = useCallback(() => {
    const randomHouse = HouseList[Math.floor(Math.random() * HouseList.length)];
    const isSameHouse = randomHouse === currentHouse;
    if (isSameHouse) {
      handleRandomHouse();
    }
    console.log("randomHouse", randomHouse);
    _setCurrentHouse(randomHouse);
    _setIsSortHouse(true);
  }, [currentHouse, _isSortHouse]);

  useEffect(() => {
    if (studentData && studentData.CurrentHouse) {
      _setCurrentHouse(studentData.CurrentHouse);
    }
  }, [studentData]);

  const ShowHouse = useMemo(() => {
    return (
      <RandomReveal
        isPlaying={_isSortHouse}
        duration={0.5}
        revealDuration={1}
        characterSet={[" "]}
        characters={` ${currentHouse}!`}
        onComplete={() => {
          _setIsSortHouse(false);
        }}
      />
    );
  }, [currentHouse, _isSortHouse]);

  return (
    <div>
      <h1>Current House:</h1>
      <p>
        {/* {studentData && studentData.CurrentHouse ? ( */}
        <span>You will be sorted into:</span>
        <span
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "red",
          }}
        >
          {ShowHouse}
        </span>
        {/* ) : (
          "You are not a student yet"
        )} */}
      </p>
      <div>
        {currentHouse ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              console.log("Change House");
            }}
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
