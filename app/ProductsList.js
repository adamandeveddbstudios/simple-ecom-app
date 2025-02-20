'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const dynamic = 'force-dynamic';

export default function ProductsList({products, initialCartProducts}) {

    const [cartProducts, setCartProducts] = useState(initialCartProducts);

    async function addToCart(productId) {
        const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + 'api/users/1/cart', {
            method: 'POST',
            body: JSON.stringify({
                productId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const updatedCartProducts = await response.json();
        setCartProducts(updatedCartProducts);
    }

    async function removeFromCart(productId) {
        const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + 'api/users/1/cart', {
            method: 'DELETE',
            body: JSON.stringify({
                productId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const updatedCartProducts = await response.json();
        setCartProducts(updatedCartProducts);
    }

    function productIsInCart(productId) {
        return cartProducts.some(cp => cp.id === productId);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => (
                <Link key={product.id} href={"/products/" + product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
                    <div className="flex justify-center mb-4 h-48 relative">
                        <Image
                            src={'/' + product.imageUrl}
                            alt="Product image"
                            quality={100}
                            fill
                            className="object-cover rounded-md" // Cover the container, maintaining aspect ratio
                        />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-gray-600">${product.price}</p>
                    {
                        productIsInCart(product.id) ?
                            <button onClick={(e) => {
                                e.preventDefault();
                                removeFromCart(product.id);
                            }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                            >Remove from cart</button>
                            :
                            <button onClick={(e) => {
                                e.preventDefault();
                                addToCart(product.id);
                            }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                            >Add to cart</button>
                    }
                </Link>
            ))}
        </div>
    )
}
