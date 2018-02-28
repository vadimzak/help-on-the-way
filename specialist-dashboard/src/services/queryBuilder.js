export function buildSearchByConditionQuery(searchFields) {
    return {
        input: {
            data: {
            ...searchFields
        }
    }}
}