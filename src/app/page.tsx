import GameEntryField from "@/components/GameEntryField";
import db from "@/db";
import Link from "next/link";
import styles from "./page.module.css";

export default async function Home() {
  const games = await db.game.findMany();
  
  return (
    <div className={styles.pageWrapper}>
      <main className={styles.main}>
        
        <h1>Games</h1>
        <p className={styles.subtitle}>Enter a game ID or select a recent board</p>
        
        <div className={styles.entryFieldWrapper}>
          <GameEntryField />
        </div>
        
        <div className={styles.jeopardyGrid}>
          {games.map((game) => {
            const gameData: any = game.data; // Type as needed
            const firstCategory = gameData.single?.categories?.[0]?.name || "First Category";
            
            return (
              <Link href={`/game/${game.id}`} key={game.id} className={styles.cardLink}>
                <div className={styles.card}>
                  <h3>Game #{game.id}</h3>
                  <p>Category 1: {firstCategory}</p>
                </div>
              </Link>
            );
          })}
        </div>
        
      </main>
    </div>
  );
}