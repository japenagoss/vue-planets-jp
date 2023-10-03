export interface IPlanet {
  [key: string]: string | number
  id: number
  url: string
  name: string
  rotationPeriod: number | string
  orbitalPeriod: number | string
  diameter: number | string
  climate: string
}

export class MyCustomError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MyCustomError'
  }
}
