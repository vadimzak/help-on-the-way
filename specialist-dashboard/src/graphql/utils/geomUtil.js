/**
 * This util helps converting and working with the data type of Geometry, https://postgis.net/docs/geometry.html
 */

/**
 * Takes a {lat lng} object, and returns an acceptable geometry string
 */
export function buildGeomString(coords) {
    return `SRID=4326;POINT(${coords.lng} ${coords.lat})`
}