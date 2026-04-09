import db from "@/db";
import scrape from "@/db/scrape";
import styles from "./board.module.css";
import { Category } from "@/db/types";
import ClueCard from "@/component/ClueCard";

function CategoryColumn({ categoryData }:  {categoryData: Category}) {
    return (
        <div className={styles.column}>
            <div className={styles.header}>
                {categoryData.name}
            </div>
            {categoryData.clues.map((clue, index) => (
                <ClueCard key={index} value={(index+1) * 200} clue={clue} />
            ))}
        </div>
    );
}

export default async function Game({ params }: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const game = await db.game.findUnique({ where: { id } }) ?? await db.game.create({ data: { id, data: await scrape(id) } });
    const gameData = game.data;

    return (
        <div className={styles.boardContainer}>
            {gameData.single?.categories?.map((data, index) => {
                return (
                    <CategoryColumn key={data.name || index} categoryData={data}></CategoryColumn>
                );
            })}
            {/* <main>
                {
                    JSON.stringify(game)
                }
            </main> */}
        </div>
    )
}
