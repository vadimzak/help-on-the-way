export default function(value) {
    if (value) {
      let date = new Date(value);
      return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
    }
  }