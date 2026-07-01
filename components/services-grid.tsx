export default function ServicesGrid() {
  const services = [
    {
      title: "Restaurant Websites",
      description: "Modern, mobile-friendly websites for restaurants.",
      priceId: "price_123", // your Stripe price ID
    },
    {
      title: "Bar & Venue Websites",
      description: "Highlight your events, menu, and atmosphere online.",
      priceId: "price_456",
    },
    {
      title: "Small Business Websites",
      description: "Websites for contractors, shops, and service businesses.",
      priceId: "price_789",
    },
  ];

  const handleCheckout = async (priceId: string) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ priceId }),
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {services.map((service) => (
        <div key={service.title} className="p-6 border rounded-xl hover:shadow-md transition bg-white">
          <h3 className="text-lg font-semibold">{service.title}</h3>
          <p className="text-gray-600 mt-3">{service.description}</p>
          <button
            onClick={() => handleCheckout(service.priceId)}
            className="mt-4 px-6 py-2 bg-black text-white rounded-full"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}