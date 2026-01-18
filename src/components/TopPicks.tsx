import Link from 'next/link';
import topPokemons from '@/data/topSearchPokemons.json';
import styles from './TopPicks.module.css';

interface TopPokemon {
    id: string;
    name: string;
    searchCount: number;
}

export default function TopPicks() {
    const top5 = [...topPokemons]
        .sort((a, b) => b.searchCount - a.searchCount)
        .slice(0, 5);

    return (
        <div className={styles.container}>
            <h3 className={styles.sectionTitle}>
                Top Search Picks
            </h3>
            <hr className={styles.divider} />
            <div className={styles.grid}>
                {top5.map((p, index) => (
                    <Link
                        href={`/?name=${p.name}`}
                        key={p.id}
                        className={`${styles.card} ${index === 0 ? styles.rank1 : ''}`}
                    >
                        <div className={styles.cardContent}>
                            <span className={styles.rankNumber}>{index + 1}</span>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={`https://img.pokemondb.net/artwork/${p.name.toLowerCase()}.jpg`}
                                    alt={p.name}
                                    className={styles.image}
                                />
                            </div>
                            <div className={styles.info}>
                                <span className={styles.name}>{p.name}</span>
                                <span className={styles.count}>{p.searchCount.toLocaleString()} searches</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}