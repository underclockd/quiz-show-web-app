import GameEntryField from "@/components/GameEntryField";
import db from "@/db";
import Link from "next/link";
import styles from "./page.module.css";

export default async function Home() {
  const games = await db.game.findMany();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Games</h1>
        <GameEntryField />
        <h2>Recent Boards</h2>
        <ul>
          {games.map((game) => {
            const gameData = game.data;
            const firstCategory = gameData.single?.categories?.[0]?.name || "First Category";
            return (
              <li key={game.id}>
                <Link href={`/game/${game.id}`}>
                  Game #{game.id}
                </Link>
                <p>Category 1: {firstCategory}</p>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
