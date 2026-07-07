import { RentalStatus } from "../../../generated/prisma/enums"

export interface IRentalOrder {
    customerId: string
    providerId: string
    gearId: string
    quantity: number
    rentalStartDate: string
    rentalEndDate: string
    totalDays: number
    pricePerDay: number
    subtotal: number
    serviceFee: number
    totalAmount: number
    status: RentalStatus
    pickupAddress: string
    notes?: string
}