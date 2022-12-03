import { Page } from "@interfaces";

export interface IWorkLog {
  id?: number
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
  id: number;
  log: string;
  labels?: string[];
  duration?: number;
}

export interface IGoalTable {
  [key: string]: IDateLog[];
}

export type IGoalPage = Page<IWorkLog>;