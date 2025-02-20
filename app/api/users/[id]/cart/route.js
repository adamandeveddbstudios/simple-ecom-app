import { connectToDb } from "@/app/db";

export async function GET(request, { params }) {
  const db = await connectToDb();
  const {userId} = await params;

  const userCart = await db.collection('carts').findOne({ userId});

  if (!userCart) {
    return new Response(JSON.stringify(['no cart data found']), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const cartIds = userCart.cartIds;

  const cartProducts = await db.collection('products').find({ id: { $in: cartIds } }).toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}


export async function POST(request, {params}) {
  const db = await connectToDb();
  const {userId} = await params;
  const body =  await request.json();

  const productId = body.productId;

  const updatedCart = await db.collection('carts').findOneAndUpdate(
    {userId},
    {$push: {cartIds : productId}},
    {upsert: true, returnDocument: 'after'}
  )

  const cartProducts =  await db.collection('products').find({id: {$in: updatedCart.cartIds}}).toArray();

  return new Response(JSON.stringify(cartProducts),{
    status: 201,
    headers: {
      "Content-Type": "application/json",
    }
  })
}

export async function DELETE(request, { params }) {
  const db = await connectToDb();
  const {userId} = await params;
  const body = await request.json();
  const productId = body.productId;

  const updatedCart = await db.collection('carts').updateOne(
    { userId },
    { $pull: { cartIds: productId } } 
  );

  if (!updatedCart) {
    return new Response(JSON.stringify(['no cart data found']), {
      status: 202,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const userCart = await db.collection('carts').findOne({ userId });

  const cartProducts = await db.collection('products').find({ id: { $in: userCart.cartIds } }).toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 202,
    headers: {
      "Content-Type": "application/json",
    },
  });
}