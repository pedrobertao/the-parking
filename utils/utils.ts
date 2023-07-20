export const isValidPlate = (plate: string): boolean => {
    const regex = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';
    return plate.match(regex) ? true : false
}