import db from "@/db";
import styles from "./page.module.css";

export default async function Home() {
  const games = await db.game.findMany();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              {JSON.stringify(game.data)}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
