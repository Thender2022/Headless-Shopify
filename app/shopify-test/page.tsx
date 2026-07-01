// app/shopify-test/page.tsx
export default async function ShopifyTestPage() {
  // Check if Shopify credentials exist
  const shopifyConfigured = !!(
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN && 
    process.env.SHOPIFY_STORE_DOMAIN
  );

  // If not configured, show fallback
  if (!shopifyConfigured) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Shopify Connection Test</h1>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">
            ⚠️ Shopify Integration Not Configured
          </h2>
          <p className="text-yellow-700">
            Add your Shopify credentials to <code className="bg-yellow-100 px-2 py-0.5 rounded">.env</code> to test the connection.
          </p>
          <p className="text-sm text-yellow-600 mt-2">
            Required: <code className="bg-yellow-100 px-2 py-0.5 rounded">SHOPIFY_STOREFRONT_ACCESS_TOKEN</code> and <code className="bg-yellow-100 px-2 py-0.5 rounded">SHOPIFY_STORE_DOMAIN</code>
          </p>
          <div className="mt-4 p-3 bg-gray-800 rounded text-white text-xs font-mono">
            <div>SHOPIFY_STORE_DOMAIN=your-store.myshopify.com</div>
            <div>SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_public_token</div>
          </div>
        </div>
      </div>
    );
  }

  // Dynamically import only when Shopify is configured
  try {
    const { shopifyFetch } = await import("@/lib/shopify/client");
    const { GET_PRODUCTS } = await import("@/lib/shopify/queries");

    const { data } = await shopifyFetch<{
      products: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            description: string;
            handle: string;
            priceRange: {
              minVariantPrice: {
                amount: string;
                currencyCode: string;
              };
            };
            images: {
              edges: Array<{
                node: {
                  url: string;
                  altText: string | null;
                };
              }>;
            };
          };
        }>;
      };
    }>({
      query: GET_PRODUCTS,
      variables: { first: 5 },
    });

    const products = data?.products?.edges || [];

    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Shopify Connection Test</h1>
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded-r-lg">
          <p className="text-green-700 font-medium">✅ Successfully connected to Shopify!</p>
          <p className="text-green-600 text-sm">Your Storefront API is working correctly.</p>
        </div>
        
        <h2 className="text-xl font-semibold mb-3">Products ({products.length}):</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((edge: {
              node: {
                id: string;
                title: string;
                description: string;
                handle: string;
                priceRange: {
                  minVariantPrice: {
                    amount: string;
                    currencyCode: string;
                  };
                };
              };
            }, index: number) => {
              const node = edge.node;
              return (
                <div key={node.id || index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-lg">{node.title}</h3>
                  <p className="text-gray-600 text-sm">
                    Price: {node.priceRange?.minVariantPrice?.amount} {node.priceRange?.minVariantPrice?.currencyCode}
                  </p>
                  <p className="text-gray-500 text-sm truncate">{node.description}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No products found in your store.</p>
        )}
        
        <details className="mt-6">
          <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">View raw JSON data</summary>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-auto text-xs mt-2 max-h-96">
            {JSON.stringify(data, null, 2)}
          </pre>
        </details>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Shopify Connection Test</h1>
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
          <h2 className="text-lg font-semibold text-red-800 mb-2">❌ Connection Failed</h2>
          <p className="text-red-700">
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
          <p className="text-sm text-red-600 mt-2">
            Please check your Shopify credentials and make sure your storefront access token has the required permissions.
          </p>
        </div>
      </div>
    );
  }
}