import { connectToDb } from "@/app/db";
 
export async function GET(request, {params}){

  const db = await connectToDb();
  const {id} = await params;
  const product = await db.collection('products').findOne({id});

  if (!product) {
    return new Response('Product not found', {
      status: 404
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}