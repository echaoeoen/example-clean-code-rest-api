import { ConfigProvider } from "../config/provider";
import { Manager } from "./manager";

export interface Registry {
  manager(): Manager
  configuration(): ConfigProvider
}