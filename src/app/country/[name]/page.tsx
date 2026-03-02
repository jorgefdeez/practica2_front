import Link from 'next/link';
import Image from 'next/image';
import { getCountryByName } from '@/lib/api/axios';

type PageProps = {
  params: Promise<{ name: string }>;
}

export default async function CountryPage({ params }: PageProps) {
  const { name } = await params;

  let country;
  try {
    country = await getCountryByName(name);
  } catch (error) {
    throw new Error(`Error al obtener el país: ${error}`);
  }

  if (!country) {
    throw new Error(`No se encontró el país "${name}".`);
  }

  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';
  const capital = country.capital?.join(', ') || 'N/A';

  return (
    <div className="detail-page">
      <div className="detail-container">
        <Link href="/" className="back-button">
          ← Volver al inicio
        </Link>

        <div className="detail-card">
          <div className="detail-flag-wrapper">
            <Image
              src={country.flags.svg || country.flags.png}
              alt={country.flags.alt || `Bandera de ${country.name.common}`}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="detail-flag"
              priority
            />
          </div>

          <div className="detail-info">
            <h1 className="detail-official-name">{country.name.official}</h1>
            {country.name.common !== country.name.official && (
              <p className="detail-common-name">{country.name.common}</p>
            )}

            <dl className="detail-info-list">
              <div className="detail-info-row">
                <dt className="detail-label">Capital</dt>
                <dd className="detail-value">{capital}</dd>
              </div>
              <div className="detail-info-row">
                <dt className="detail-label">Región</dt>
                <dd className="detail-value">{country.region}</dd>
              </div>
              {country.subregion && (
                <div className="detail-info-row">
                  <dt className="detail-label">Subregión</dt>
                  <dd className="detail-value">{country.subregion}</dd>
                </div>
              )}
              <div className="detail-info-row">
                <dt className="detail-label">Población</dt>
                <dd className="detail-value">
                  {country.population.toLocaleString('es-ES')}
                </dd>
              </div>
              <div className="detail-info-row">
                <dt className="detail-label">Idiomas</dt>
                <dd className="detail-value">{languages}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
