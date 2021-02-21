import { Page } from "@interfaces";

export interface IWorkLog {
  log: string;
  labels?: string[]
}

export type IGoalPage = Page<IWorkLog>;