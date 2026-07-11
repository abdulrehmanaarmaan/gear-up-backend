import Stripe from "stripe"
import { prisma } from "../../lib/prisma"
import { PaymentStatus, RentalStatus } from "../../../generated/prisma/enums"

export const handleCheckoutCompleted = async (session: Stripe.Checkout.Session) => {

    try {
        const { customerId } = session?.metadata!
        const rentalOrderId = session?.metadata?.rentalOrderId
        const stripeCustomerId = session?.customer as string
        const paymentIntentId = session?.payment_intent as string
        if (!customerId || !rentalOrderId || !stripeCustomerId || !paymentIntentId) {
            throw new Error("Missing required metadata in the session object.")
        }

        await prisma.$transaction(async (tx) => {

            const { COMPLETED } = PaymentStatus

            await tx.payment.upsert({
                where: {
                    paymentIntentId
                },
                create: {
                    paymentIntentId,
                    transactionId: session?.id,
                    stripeCustomerId,
                    status: COMPLETED,
                    rentalOrderId: rentalOrderId as string,
                    customerId,
                    amount: session.amount_total! / 100,
                    paidAt: new Date(session.created * 100)
                },
                update: {
                    transactionId: session?.id,
                    stripeCustomerId,
                    status: COMPLETED,
                    rentalOrderId: rentalOrderId as string,
                    customerId,
                    amount: session.amount_total! / 100,
                    paidAt: new Date(session.created * 100)
                }
            })

            await tx.rentalOrder.update({
                where: {
                    id: rentalOrderId
                },
                data: {
                    status: RentalStatus.PAID
                }
            })

        })

        console.info("Stripe checkout completed.", {
            paymentIntentId,
            rentalOrderId,
        });
    }
    catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}