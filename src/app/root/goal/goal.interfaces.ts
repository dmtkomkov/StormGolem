import { Page } from "@interfaces";

export interface IWorkLog {
  log: string;
  date?: string;
  labels?: string[],
  duration?: number;
}

export interface ILabel {
  name: string;
  group: string;
}

export interface ILabelGroup {
  name: string;
  color: string;
}

export interface IDateLog {
  log: string;
  labels?: string[];
  duration?: number;
}

export interface IGoalTable {
  [key: string]: IDateLog[];
}

export type IGoalPage = Page<IWorkLog>;