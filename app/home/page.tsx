// app/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/ui/HeroSection";
import ProductsSection from "@/components/ui/ProductSection";
import BrandIntro from "@/components/ui/BrandIntro";
import NewsletterSignup from "@/components/ui/NewsSignUp";
import ImageGrid from "@/components/ui/ImageGrid";
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
        <HeroSection />
        <ProductsSection products={products} />
        <BrandIntro />
        <ImageGrid /> {/* ← Add this line */}
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
}