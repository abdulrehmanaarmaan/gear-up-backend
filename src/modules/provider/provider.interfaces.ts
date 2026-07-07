import { GearCondition, GearStatus } from "../../../generated/prisma/enums"

export interface GearSpecifications {
    frame?: string;
    wheelSize?: string;
    brakes?: string;
    gears?: string;
    suspension?: string;
    capacity?: string;
    waterproof?: boolean;
    material?: string;
    weight?: string;
    [key: string]: string | number | boolean | null | undefined;
}

export interface IGear {
    providerId: string
    categoryId: string
    title: string
    slug: string
    description: string
    brand: string
    model?: string
    condition: GearCondition
    pricePerDay: number
    quantity: number
    availableQuantity: number
    images: string[]
    specifications?: GearSpecifications
    location: string
    isAvailable: boolean
    status: GearStatus
}