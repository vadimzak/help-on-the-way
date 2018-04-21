import ElderMobilityEnum from 'shared/constants/enums/ElderMobilityType'
export default function formatElderMobility(value) {
    if (ElderMobilityEnum[value]) {
        return ElderMobilityEnum[value].text
    }
    return ''
}