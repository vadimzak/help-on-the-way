export default function(address, omitNumber) {
  if (address && address.street && address.city) {
      const city = shortenCityName(address.city)
      const number = omitNumber ? '' : ' ' + (address.houseNumber || '')
      return address.street + number + ', ' + city;
    } 
}
  
function shortenCityName(city) {
  const tlvAbvr = ['תל אביב יפו'];
  if (tlvAbvr.includes(city)) {
    return 'תל אביב';
  }
  return city;
}