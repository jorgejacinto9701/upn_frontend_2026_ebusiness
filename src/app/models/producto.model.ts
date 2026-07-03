export class Producto {
    id ?: number
    title ?: string
    price ?: number
    description ?: string
    category ?: string
    image ?: string
    rating?: Rating
}

export class Rating {
    rate ?: number
    count ?: number
}