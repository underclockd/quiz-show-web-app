import ClueCard from "@/components/ClueCard/ClueCard";
import { Category } from "@/db/types";
import styles from "./CategoryColumn.module.css";

export default function CategoryColumn({ categoryData, clueCompleteHandler, baseValue }: { categoryData: Category, clueCompleteHandler: () => void, baseValue: number }) {
    return (
        <div className={styles.column}>
            {/* Category title */}
            <div className={styles.header}>
                {categoryData.name}
            </div>
            {/* Construct the clues for each category */}
            {categoryData.clues.map((clue, index) => (
                <ClueCard key={index} value={(index + 1) * baseValue} clue={clue} onClueFinished={clueCompleteHandler} />
            ))}
        </div>
    );
}
