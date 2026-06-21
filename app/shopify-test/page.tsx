// app/shopify-test/page.tsx
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCTS } from "@/lib/shopify/queries";

export default async function ShopifyTestPage() {
  try {
    const { data } = await shopifyFetch({
      query: GET_PRODUCTS,
      variables: { first: 5 },
    });

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Shopify Connection Test</h1>
        <p className="text-green-600 mb-4">✅ Successfully connected to Shopify!</p>
        <h2 className="text-xl font-semibold mb-2">Products:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Connection Failed</h1>
        <p className="text-red-500">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }
}