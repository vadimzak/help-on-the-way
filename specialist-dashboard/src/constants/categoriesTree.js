import { TicketSubCategory, TicketCategory } from './enums'
import categoryToFormMap from './categoryToFormMap'
function constructTicketCategories() {
    const categories = Object.keys(TicketCategory).map(key => TicketCategory[key]);
    const subCategories = Object.keys(TicketSubCategory).map(key => TicketSubCategory[key]);
    return categories
        .map(category => {
            const categoryWithSubs = { self: category, form: categoryToFormMap[category.value] };
            const subs = subCategories
                .filter(subcat => subcat.parent.value === category.value);
            // support direct access to each subcategory by it unqiue value
            subs.forEach(subcat => categoryWithSubs[subcat.value] = subcat);
            // support access to all  subcategories of a category as array            
            categoryWithSubs.subCategories = subs;
            return categoryWithSubs;
        })
        .reduce((tree, currentCategory) => {
            tree[currentCategory.self.value] = currentCategory;
            return tree;
        }, {});
}


export default constructTicketCategories();