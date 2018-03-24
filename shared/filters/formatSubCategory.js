import subCategories from '../constants/enums/TicketSubCategory';
const mappedSubCategories = Object.values(subCategories).reduce((map, subcategory) => {
    map[subcategory.value] = subcategory.text;
    return map;
}, {})
export default function (subEnum) {
    if (subEnum) {
        return mappedSubCategories[subEnum] || ''
  }
}  