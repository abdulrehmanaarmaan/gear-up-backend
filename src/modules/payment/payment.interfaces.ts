import { PaymentMethod, PaymentProvider, PaymentStatus } from "../../../generated/prisma/enums"

export interface IPayment {
    rentalOrderId: string
    customerId: string
    transactionId: string
    paymentIntentId?: string
    amount: number
    currency?: string
    method: PaymentMethod
    provider: PaymentProvider
    status?: PaymentStatus
    paidAt?: string
}