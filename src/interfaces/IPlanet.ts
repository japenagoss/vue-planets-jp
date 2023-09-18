export interface IPlanet {
    [key: string]: string | number,
    name: string,
    rotationPeriod: string | number,
    orbitalPeriod: string | number,
    diameter: string | number,
    climate: string,
    gravity: string,
    terrain: string,
    surfaceWater: string | number,
    population: string | number
}