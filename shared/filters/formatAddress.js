export default function(address, format) {
  if (address && address.street && address.city) {
    const city = shortenCityName(address.city)
    switch (format) {
      case 'preview':
          return `${address.street}, ${city}`  
        break;
      case 'street':
        return `${address.street}`
        break;
      case 'city':
        return `${address.city}`
        break;
      default:
        return `${address.street} ${address.houseNumber}, ${city}`  
        break;  
    }
  } else if(!format || format === 'preview' || format === 'street'){
      return 'הקרוב לבית המגורים'
  }
  return ''
}
  
function shortenCityName(city) {
  const tlvAbvr = ['תל אביב יפו'];
  if (tlvAbvr.includes(city)) {
    return 'תל אביב';
  }
  return city;
}