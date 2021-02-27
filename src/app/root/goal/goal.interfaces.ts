import { Page } from "@interfaces";

export interface IWorkLog {
  log: string;
  date: string;
  labels?: string[]
}

export interface IDateLog {
  log: string;
  labels?: string[]
}

export interface IGoalTable {
  [key: string]: IDateLog[];
}

export type IGoalPage = Page<IWorkLog>;