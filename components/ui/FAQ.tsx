// app/components/ui/FAQ.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Fawkyumean?",
    answer: "Fawkyumean is a streetwear collective born from the streets of Baltimore and shaped by the energy of Long Beach. We're building a community of individuals who stand in their own identity but understand the power of coming together."
  },
  {
    question: "When will new drops be released?",
    answer: "We release new collections through limited drops. Follow us on Instagram and join our newsletter to get notified first."
  },
  {
    question: "What materials are used for your products?",
    answer: "We use high-quality materials designed for durability and comfort. All our products are made with premium fabrics that can handle the streets and the skate park."
  },
  {
    question: "How do I know what size to order?",
    answer: "Check our Size Guide page for detailed measurements. We recommend sizing up if you prefer an oversized streetwear fit."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in original condition with tags attached."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide. Shipping rates and times vary by location. You'll see the exact cost at checkout."
  },
  {
    question: "How can I contact you?",
    answer: "Email us at info@fawkyumean.com or DM us on Instagram @fawkyumeann. We'll get back to you within 24-48 hours."
  },
  {
    question: "Do you offer discounts for bulk orders?",
    answer: "For bulk orders or wholesale inquiries, please contact us directly at info@fawkyumean.com."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Everything you need to know about Fawkyumean.
        </p>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border border-gray-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{item.question}</span>
                <span className="text-2xl text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Newsletter Link Section - A little more space above */}
        <div className="mt-12 pt-6 text-center">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-4">
            Stay connected and get early access to drops.
          </p>
          <Link
            href="/#newsletter"
            className="inline-block px-8 py-3 bg-black text-white text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
          >
            Join the Newsletter
          </Link>
        </div>
      </div>
    </section>
  );
}