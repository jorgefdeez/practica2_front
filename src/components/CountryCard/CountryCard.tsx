import Link from 'next/link';
import Image from 'next/image';
import styles from './CountryCard.module.css';

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
    <Link href={`/country/${slug}`} className={styles.card}>
      <div className={styles.flagWrapper}>
        <Image
          src={country.flags.png}
          alt={country.flags.alt || `Bandera de ${country.name.common}`}
          fill
          sizes="(max-width: 600px) 160px, 200px"
          className={styles.flag}
        />
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{country.name.common}</h2>
      </div>
    </Link>
  );
}
