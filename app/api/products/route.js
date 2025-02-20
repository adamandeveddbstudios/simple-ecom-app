
import { connectToDb } from "@/app/db";
 
export async function GET(){
  const db = await connectToDb();
  const products = await db.collection('products').find({}).toArray();

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}




// import { connectToDb } from "@/app/db";

// export async function GET() {
//   try {

//     const db = await connectToDb();
//     const products = await db.collection('products').find({}).toArray();

//     return new Response(JSON.stringify(products), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return new Response(
//       JSON.stringify({ message: 'Failed to fetch products' }),
//       {
//         status: 500,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//   }
// }
