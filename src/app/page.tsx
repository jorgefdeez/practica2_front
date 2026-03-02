'use client';

import { useState, useEffect } from 'react';
import CountryCard from '@/components/CountryCard/CountryCard';
import { getAllCountries } from '@/lib/api/axios';
import type { CountryBasic } from '@/types';
import styles from './page.module.css';

export default function Home() {
  const [countries, setCountries] = useState<CountryBasic[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllCountries()
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo cargar la lista de países. Inténtalo de nuevo.');
        setLoading(false);
      });
  }, []);

  const filtered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>🌍 Explorador de Países</h1>
        <input
          type="text"
          placeholder="Buscar país..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
          aria-label="Buscar país"
        />
      </header>

      <main className={styles.main}>
      {loading && <p className={styles.message}>Cargando países...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && (
          <>
            <p className={styles.count}>
              {filtered.length} país{filtered.length !== 1 ? 'es' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
            </p>
            <div className={styles.grid}>
              {filtered.map((country) => (
                <CountryCard key={country.name.common} country={country} />
              ))}
            </div>
            {filtered.length === 0 && search && (
              <p className={styles.noResults}>
                No se encontraron países con &quot;{search}&quot;.
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
