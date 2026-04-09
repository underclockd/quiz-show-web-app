import db from "@/db";
import styles from "./page.module.css";
import Link from "next/link";
import type { Board, Round, Category, Clue } from "@/db/types";
import GameEntryField from "@/component/GameEntryField";

export default async function Home() {
  const games = await db.game.findMany();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Games</h1>
        <GameEntryField />
        <ul>
          
          <h2>Popular Boards</h2>
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
          
          {/* {games.map((game) => (
            <li key={game.id}>
              {JSON.stringify(game.data)}
            </li>
          ))} */}
        </ul>
      </main>
    </div>
  );
}
