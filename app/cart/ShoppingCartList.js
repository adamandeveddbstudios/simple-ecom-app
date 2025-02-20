"use client"

import Link from "next/link";
import { useState } from "react"

export const dynamic = 'force-dynamic';
export default function ShoppingCartList({initialCartProducts}){

    const [cartProducts, setCartProducts] = useState(initialCartProducts);


    async function removeFromCart(productId) {
        const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + 'api/users/1/cart',{
            method: 'DELETE',
            body: JSON.stringify({
                productId
            })
        })
        const updatedCartProducts = await response.json();
        setCartProducts(updatedCartProducts);
    }


    if(!cartProducts || cartProducts.length === 0){
        return <div className="container mx-auto p-8 flex flex-col items-center justify-center h-screen"> 
        <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1> 
      </div>
    }
    return(
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
            <ul className="space-y-4">
                {cartProducts.map((product) => (
                    <li key={product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
                    <Link href={`/products/${product.id}`}>
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600">${product.price}</p>
                        <div className="flex justify-end">
                        <button onClick={(e)=> {
                        e.preventDefault();
                        removeFromCart(product.id)
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >Remove from cart</button> 
                        </div>
                    </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}