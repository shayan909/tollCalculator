//function to calculate toll price
import Constants from '../constants/Constants'

export default function CalculateTollPrice(entryInterchange,
    exitInterchange, numberPlate, entryDate) {
    let ratePerKm = 0;
    let discount = null;
    let subTotal = 0;
    let discountCost = 0;
    let total = 0;
    //get day
    let date = new Date();
    let day = date.getDay();

    console.log(entryInterchange,
        exitInterchange, numberPlate, entryDate)

    if (day === 6 || day === 0) {
        ratePerKm = Constants.WEEKEND_RATE_EXIT
    }
    else {
        ratePerKm = Constants.CHARGE_PER_KM
    }
    if (numberPlate % 2 === 0 && (date.getDay(entryDate) === 1 ||
        date.getDay(entryDate) === 3)) {
        discount += Constants.MON_WED_EVEN_DISCOUNT_EXIT
    }
    else if (numberPlate % 2 !== 0 && (date.getDay(entryDate) === 2 ||
        date.getDay(entryDate) === 4)) {
        discount += Constants.TUE_THUR_ODD_DISCOUNT_EXIT
    }
    if ((date.getDate() === 23 && date.getMonth() === 2) ||
        (date.getDate() === 14 && date.getMonth() === 7) ||
        (date.getDate() === 25 && date.getMonth() === 11)) {
        discount += Constants.NATIONAL_HOLIDAY_DISCOUNT
    }
    total = (Constants.BASE_RATE + ratePerKm * (entryInterchange + exitInterchange)) * (discount !== null ? discount : 1)
    subTotal = (Constants.BASE_RATE + ratePerKm * (entryInterchange + exitInterchange))
    discountCost = subTotal - total

    return [Math.round(subTotal), Math.round(total), Math.round(discountCost)]


}
