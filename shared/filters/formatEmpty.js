export default function formatEmpty(value, emptyValue) {
    if (value) {
        return value
    }
    return emptyValue || ''
}