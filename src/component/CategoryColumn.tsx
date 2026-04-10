import styles from "@/app/game/[id]/board.module.css";
import { Category } from "@/db/types";
import ClueCard from "@/component/ClueCard";

export default function CategoryColumn({ categoryData, clueCompleteHandler }:  {categoryData: Category, clueCompleteHandler: () => void}) {
    return (
        <div className={styles.column}>
            {/* Category title */}
            <div className={styles.header}>
                {categoryData.name}
            </div>
            {/* Construct the clues for each category */}
            {categoryData.clues.map((clue, index) => (
                <ClueCard key={index} value={(index+1) * 200} clue={clue} onClueFinished={clueCompleteHandler}/>
            ))}
        </div>
    );
}