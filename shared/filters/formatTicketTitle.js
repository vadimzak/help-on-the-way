import categoriesTree from '../constants/categoriesTree'
export default function (ticket) {
  if (ticket) {
    const category = categoriesTree[ticket.category].self;
    const subcategory = categoriesTree[ticket.category][ticket.subCategory];
    const subcategoryText = subcategory ? subcategory.text : '';
    const whatPart = category.isIndoor ? subcategoryText : 'מקום כלשהו'
      return `${ticket.elder.firstName} - ${category.noun}${whatPart}`
    }
    return ''
  }