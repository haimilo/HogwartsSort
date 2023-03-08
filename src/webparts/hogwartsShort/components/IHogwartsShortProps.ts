import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IHogwartsShortProps {
  description: string;
  userDisplayName: string;
  context: WebPartContext;
  userDisplayEmail: string;
}

export interface IStudentData {
  Id: number | null;
  Title: string | null;
  FullName: string | null;
  Email: string | null;
  CurrentHouse: string | null;
  CurrentDateandTime: Date | null;
}
