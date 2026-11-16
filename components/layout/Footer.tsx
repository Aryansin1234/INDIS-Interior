import Link from "next/link";
import { business, collections, navItems, services } from "@/data/site";
import FooterBrand from "@/components/layout/FooterBrand";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <Link className="brand brand--footer" href="/">
            <span className="brand__mark">INDIS</span>
            <span className="brand__sub">Interiors</span>
          </Link>
          <p>
            Thoughtful interiors, beautifully considered details, and homes shaped around the way people live.
          </p>
          <div className="footer-actions">
            <a href={business.phoneHref}>{business.phone}</a>
            <a href={business.emailHref}>{business.email}</a>
          </div>
        </div>

        <div>
          <h2>Explore</h2>
          <ul>
            {navItems.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Collections</h2>
          <ul>
            {collections.map((collection) => (
              <li key={collection.slug}>
                <Link href={`/collections/${collection.slug}`}>{collection.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Services</h2>
          <ul>
            {services.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Big animated name */}
      <FooterBrand />

      
    </footer>
  );
}
