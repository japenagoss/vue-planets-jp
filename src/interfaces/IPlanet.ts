export interface IPlanet {
  [key: string]: string | number
  id: number
  url: string
  name: string
  rotationPeriod: number
  orbitalPeriod: number
  diameter: number
  climate: string
}
