import { Request, Response } from 'express';

export default class AppController {
  constructor(private request: Request, private response: Response) {}

  async index (): Promise<string> {
    return 'Hello world'
  }
}
