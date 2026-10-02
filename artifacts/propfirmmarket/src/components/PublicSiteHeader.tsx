import { Link } from 'wouter';
import { Logo } from './Logo';

export function PublicSiteHeader() {
  return (
    <header className="pf-public-header">
      <Link href="/" aria-label="PropFirmMarket home">
        <Logo size={40} />
      </Link>
      <nav aria-label="Public site">
        <Link href="/">Home</Link>
        <Link href="/firms">Firms</Link>
        <Link href="/challenges">Challenges</Link>
        <Link href="/compare">Compare</Link>
      </nav>
    </header>
  );
}