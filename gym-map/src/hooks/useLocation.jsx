import { getDistance } from 'geolib';


export const Location = () => {
  const getLocation = (lat, long) => {
    const distancia = getDistance(lat, long, 1)
    return distancia
  }
  return getLocation
}