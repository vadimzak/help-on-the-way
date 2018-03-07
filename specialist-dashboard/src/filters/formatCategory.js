import categories from '@/constants/enums//TicketCategory';
const mappedCategories = Object.values(categories).reduce((map, category) => {
    map[category.value] = category.text;
    return map;
}, {})
export default function (categoryEnum) {
    if (categoryEnum) {
        return mappedCategories[categoryEnum] || ''
  }
}  