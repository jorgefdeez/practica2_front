import Link from 'next/link';
import Image from 'next/image';
type CountryCardProps = {
  country: {
    name: {
      common: string;
    };
    flags: {
      png: string;
      svg?: string;
      alt?: string;
    };
  };
}

export default function CountryCard({ country }: CountryCardProps) {
  const slug = country.name.common.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link href={`/country/${slug}`} className="country-card">
      <div className="card-flag-wrapper">
        <Image
          src={country.flags.png}
          alt={country.flags.alt || `Bandera de ${country.name.common}`}
          fill
          sizes="(max-width: 600px) 160px, 200px"
          className="card-flag"
        />
      </div>
      <div className="card-info">
        <h2 className="card-name">{country.name.common}</h2>
      </div>
    </Link>
  );
}
