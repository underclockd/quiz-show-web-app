import GameEntryField from "@/components/GameEntryField";
import db from "@/db";
import Link from "next/link";
import styles from "./page.module.css";

export default async function Home() {
  const games = await db.game.findMany();

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.main} id="main-content">
        <section className={styles.heroPanel} aria-label="Game search">
          <h1>Trivia Show</h1>
          <div className={styles.entryFieldWrapper}>
            <GameEntryField />
          </div>
        </section>

        <section className={styles.boardShelf} aria-labelledby="recent-games-heading">
          <div className={styles.sectionHeader}>
            <h2 id="recent-games-heading">Recent Boards</h2>
          </div>

          <ul className={styles.jeopardyGrid} style={{ background: "none" }}>
            {games.map((game) => {
              const gameData = game.data as PrismaJson.GameData;
              const firstCategory = gameData.single?.categories?.[0]?.name || "First Category";

              return (
                <li key={game.id}>
                  <Link href={`/game/${game.id}`} className={styles.cardLink}>
                    <article className={styles.card}>
                      <span className={styles.cardEyebrow}>Game</span>
                      <h3>#{game.id}</h3>
                      <p>{firstCategory}</p>
                    </article>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div >
  );
}