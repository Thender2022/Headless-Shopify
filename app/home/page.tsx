// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShopifyProductCard } from "@/components/ui/shopify-product-card";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCTS } from "@/lib/shopify/queries";

async function getShopifyProducts() {
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
          variants: {
            edges: Array<{
              node: {
                id: string;
                title: string;
                price: {
                  amount: string;
                  currencyCode: string;
                };
                availableForSale: boolean;
              };
            }>;
          };
        };
      }>;
    };
  }>({
    query: GET_PRODUCTS,
    variables: { first: 3 },
  });

  return data.products.edges.map(edge => edge.node);
}

export default async function HomePage() {
  const products = await getShopifyProducts();

  return (
    <>
      <Navbar />
      
      <main className="bg-white min-h-screen">
        {/* Hero Section - Image stays the same size */}
        <section>
            <div className="relative h-screen max-h-[800px] w-full">
                <Image
                    src="/FYM3.jpeg" // Your main brand image
                    alt="Brand hero image"
                    width={1920}  // Set your image's actual width
                    height={1080} // Set your image's actual height
                    className="w-full h-auto"
                    priority
                />
            </div>
        </section>
        
        {/* Products Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {/* Centered text content */}
            <div className="max-w-2xl mx-auto text-center mb-12">
              <Image 
                src="/fawkyumean.jpeg"
                alt="Enter Website"
                width={900}
                height={700}
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            
            {/* 3-Item Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {products.map((product) => (
                <ShopifyProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* View All Button */}
            <div className="text-center mt-12">
              <Link 
                href="/shopify-products" 
                className="inline-block border border-gray-300 px-8 py-3 text-sm tracking-wider uppercase hover:bg-gray-50 transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}