import ShoppingCartList from "./ShoppingCartList";
// export const dynamic = 'force-dynamic';
export default async function Cart() {
  const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + 'api/users/1/cart');
  const cartProducts = await response.json();

  return (
    <ShoppingCartList initialCartProducts={cartProducts}/>
  );
}
