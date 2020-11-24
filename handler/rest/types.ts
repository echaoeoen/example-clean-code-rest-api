import { Request, Response } from "express";
import Context from "../../context/context";

export interface RestRequest extends Request{
  context: Context
  files: any
}
export interface RestResponse extends Response{}
