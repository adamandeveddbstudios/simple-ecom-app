import NotFoundPage from "@/app/not-found";
// import { products } from "@/app/product-data";
import Image from "next/image";
export const dynamic = 'force-dynamic';

export default async function ProductDetail({params}){

    const { id } = await params;
    const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + 'api/products/' + id);
    const product = await response.json();

    if(!product){
        return(<NotFoundPage />)
    }

    return (
        <div className="container mx-auto p-8 flex flex-col md:flex-row h-lvh">
            <div className="md:w-1/2 mb-4 md:mb-0 md:mr-8 relative">
                <Image src={`/${product.imageUrl}`} fill quality={100} className="w-full rounded-lg shadow-md object-cover" alt={product.name}/>
            </div>
            <div className="md:w-1/2">
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-2xl text-gray-600 mb-6">${product.price}</p>
                <h3 className="text-2xl font-semibold">Description</h3>
                <p className="text-gray-700">{product.description}</p>
            </div>
        </div>
    )
}