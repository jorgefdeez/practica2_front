import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCountryByName } from '@/lib/api/axios';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function CountryPage({ params }: PageProps) {
  const { name } = await params;

  let country;
  try {
    country = await getCountryByName(name);
  } catch {
    notFound();
  }

  if (!country) {
    notFound();
  }

  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';
  const capital = country.capital?.join(', ') || 'N/A';

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backButton}>
          ← Volver al inicio
        </Link>

        <div className={styles.card}>
          <div className={styles.flagWrapper}>
            <Image
              src={country.flags.svg || country.flags.png}
              alt={country.flags.alt || `Bandera de ${country.name.common}`}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className={styles.flag}
              priority
            />
          </div>

          <div className={styles.details}>
            <h1 className={styles.officialName}>{country.name.official}</h1>
            {country.name.common !== country.name.official && (
              <p className={styles.commonName}>{country.name.common}</p>
            )}

            <dl className={styles.infoList}>
              <div className={styles.infoRow}>
                <dt className={styles.label}>Capital</dt>
                <dd className={styles.value}>{capital}</dd>
              </div>
              <div className={styles.infoRow}>
                <dt className={styles.label}>Región</dt>
                <dd className={styles.value}>{country.region}</dd>
              </div>
              {country.subregion && (
                <div className={styles.infoRow}>
                  <dt className={styles.label}>Subregión</dt>
                  <dd className={styles.value}>{country.subregion}</dd>
                </div>
              )}
              <div className={styles.infoRow}>
                <dt className={styles.label}>Población</dt>
                <dd className={styles.value}>
                  {country.population.toLocaleString('es-ES')}
                </dd>
              </div>
              <div className={styles.infoRow}>
                <dt className={styles.label}>Idiomas</dt>
                <dd className={styles.value}>{languages}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
