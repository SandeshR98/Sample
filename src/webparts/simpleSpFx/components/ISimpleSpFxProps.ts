import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISimpleSpFxProps {
  description: string;
  spfxContext: WebPartContext;
  siteUrl: string;
}
