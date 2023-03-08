import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IStudentData } from "../IHogwartsShortProps";
export interface ICurrentHouse {
  context: WebPartContext;
  studentData: IStudentData;
}
