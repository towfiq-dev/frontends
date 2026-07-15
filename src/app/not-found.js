import NotFoundContent from "@/components/notFound/NotFoundContent";

// A 404 page must never be indexed and should never carry the site's
// default title/description (that would create duplicate-title / soft-404
// signals in Search Console). Since the visual page needs client-side
// interactivity (framer-motion, onClick), this file stays a server
// component purely so it can export real metadata, and delegates all
// markup/animation to NotFoundContent.
export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}
