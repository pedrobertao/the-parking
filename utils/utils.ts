import dayjs from "dayjs";

export const isValidPlate = (plate: string): boolean => {
    const regexPlate = /^[a-zA-Z]{3}[0-9]{4}$/;
    return regexPlate.test(plate)
}

export const calcTimeOnParking = (paid: boolean, whenCreated: Date, whenPaid: Date | undefined): string => {
    const now = dayjs()

    if (!whenPaid) {
        return ""
    }

    const timeDif = paid ? dayjs(whenPaid) : now
    const time = `${timeDif.diff(dayjs(whenCreated), 'minute')} minutes`
    return time
}
