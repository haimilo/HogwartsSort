import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IHogwartsShortProps {
  description: string;
  // isDarkTheme: boolean;
  // environmentMessage: string;
  // hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  userDisplayEmail: string;
}
