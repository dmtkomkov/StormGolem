import { Page } from "@interfaces";

export interface IWorkLog {
  log: string;
  date: Date;
  labels?: string[]
}

export type IGoalPage = Page<IWorkLog>;