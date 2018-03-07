export default function(address) {
    if (address) {
      return address.street + ' ' + address.houseNumber + ', ' + address.city;
    }
  }