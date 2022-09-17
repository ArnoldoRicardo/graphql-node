import { testConexion } from './services'

export default class AppController {
  async index (): Promise<string> {
    return testConexion()
  }
}
