import { NavBar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { FeatureSection } from "@/components/landing/feature-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { TestimonialSection } from "@/components/landing/testimonial-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

// JSON-LD structured data for rich search results
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://lea4n.com/#organization",
      name: "Lea4n",
      url: "https://lea4n.com",
      logo: {
        "@type": "ImageObject",
        url: "https://lea4n.com/logo.png",
      },
      sameAs: [
        "https://twitter.com/lea4n",
        "https://github.com/lea4n",
        "https://linkedin.com/company/lea4n",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://lea4n.com/#website",
      url: "https://lea4n.com",
      name: "Lea4n",
      description: "AI-Powered Learning Platform - Study Smarter with AI",
      publisher: {
        "@id": "https://lea4n.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://lea4n.com/blog?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Lea4n",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1000",
        bestRating: "5",
        worstRating: "1",
      },
      description:
        "AI-powered study assistant that helps students learn faster. Upload materials, organize by subject, and chat with AI.",
      featureList: [
        "AI-powered chat assistance",
        "Document upload and OCR",
        "Subject-based organization",
        "Persistent memory across sessions",
        "Practice question generation",
        "Real-time streaming responses",
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background">
        <NavBar />
        <main>
          <Hero />
          <FeatureSection />
          <HowItWorksSection />
          <TestimonialSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}
