import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { SPFI } from "@pnp/sp";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { getSP } from "../../../../pnpConfig";
import { IStudentData } from "../IHogwartsShortProps";
import { ICurrentHouse } from "./ICurrentHouse";
import { styled } from "@mui/material/styles";

const HouseList = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ccc",
    color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CurrentHouse = (props: ICurrentHouse) => {
  const { studentData, context } = props;
  const [currentHouse, _setCurrentHouse] = useState<string>(
    studentData && studentData.CurrentHouse ? studentData.CurrentHouse : ""
  );
  const [_listStudent, _setListStudent] = useState<IStudentData[]>([]);
  const [isChangeHouse, setIsChangeHouse] = useState<boolean>(false);

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
        })
        .then(() => {
          setIsChangeHouse(true);
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

  useEffect(() => {
    if (!studentData && currentHouse === "" && isChangeHouse === false) {
      return;
    } else {
      _sp.web.lists
        .getByTitle(LIST_NAME)
        .items.filter(`CurrentHouse eq '${currentHouse}'`)
        .orderBy("FullName", true)()
        .then((items) => {
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
          setIsChangeHouse(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentHouse, isChangeHouse]);

  const houseColor = useMemo(() => {
    switch (currentHouse) {
      case "Gryffindor":
        return "warning";
      case "Hufflepuff":
        return "secondary";
      case "Ravenclaw":
        return "error";
      case "Slytherin":
        return "info";
      default:
        return "default";
    }
  }, [currentHouse]);

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
      <hr />
      {currentHouse !== "" && (
        <>
          <h1>
            Members in
            <span
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              {" "}
              {currentHouse}
              {"'s "}
            </span>
            house:
          </h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Index</StyledTableCell>
                  <StyledTableCell>Full Name</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">
                    Current House
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Join Date and Time
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {_listStudent.map((student, index) => (
                  <StyledTableRow
                    key={student.FullName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row" align="center">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {student.FullName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {student.Email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Chip label={student.CurrentHouse} color={houseColor} />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {student.CurrentDateandTime}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <hr />
    </div>
  );
};

export default CurrentHouse;
