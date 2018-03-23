import store from './index'
/**
 * Return each requested field with a getter and setter, 
 * that request the field from the state, and updates the field through commiting the given updateMethod
 * @param {Array} fields - the field names to map
 * @param {string} storeModule  - the module on the store to work with
 * @param {string} path  - path to the object on the given module
 * @param {*} updateMethod - the name to commit with updates
 */
export function mapStateForForm(fields, storeModule, path, updateMethod) {
    return fields.reduce((fieldsObject, field ) => {
        fieldsObject[field] = {
            get() {
                return store.state[storeModule][path][field]
            },
            set(value) {
                store.commit(updateMethod, { [field]: value })
            }
        }
        return fieldsObject
    }, {})
}