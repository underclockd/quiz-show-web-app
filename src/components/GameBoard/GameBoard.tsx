"use client";
import { useState } from "react";

import ClueCard from "@/components/ClueCard/ClueCard";
import { Board, Category } from "@/db/types";
import CategoryHeader from "../CategoryHeader/CategoryHeader";
import styles from "./GameBoard.module.css";



function FinalRoundDisplay({ categoryData }: { categoryData: Category }) {
    // 0: Showing Clue
    // 1: Showing Answer
    const [showAnswer, setShowAnswer] = useState(false);

    const clue = categoryData?.clues?.[0];

    const handleClick = () => {
        if (!showAnswer) {
            setShowAnswer(true);
        }
    };

    return (
        <div className={styles.finalRoundContainer} onClick={handleClick}>
            <div className={styles.finalCategory}>
                {categoryData?.name || "Final Category"}
            </div>

            <div className={styles.finalClue}>
                {showAnswer ? clue?.response : clue?.text}
            </div>
        </div>
    );
}

export default function GameBoard({ gameData }: { gameData: Board }) {
    // Current round of the game
    const [currentRound, setCurrentRound] = useState<'single' | 'double' | 'final'>('single');

    // Number of clues fully revealed (answer shown)
    const [, setRevealedCount] = useState(0);

    // Total number of clues for the given round.
    const totalClues = gameData[currentRound]?.categories?.reduce(
        (total: number, cat: Category) => total + cat.clues.length, 0
    ) || 0;

    // Passed to children to manage state.
    // When the revealed count >= total clues in the round, advance the round.
    // Otherwise, increment the revealedCount.
    const handleClueComplete = () => {
        setRevealedCount((prevCount) => {
            const newCount = prevCount + 1;
            if (newCount >= totalClues) {
                switch (currentRound) {
                    case 'single':
                        setCurrentRound('double');
                        return 0;
                    case 'double':
                        setCurrentRound('final');
                        return 0;
                }
            }
            return newCount;
        });
    };

    if (currentRound === 'final') {
        const finalCategoryData = gameData.final?.categories?.[0];
        return <FinalRoundDisplay categoryData={finalCategoryData} />;
    }

    const baseValue = currentRound === "double" ? 400 : 200;
    const categories = gameData[currentRound]?.categories ?? [];
    const clueRowCount = Math.max(0, ...categories.map((category) => category.clues.length));

    return (
        <table className={styles.boardContainer}>
            <thead>
                <tr>
                    {categories.map((category, index) => (
                        <CategoryHeader key={`header-${category.name || index}`} title={category.name || ""} />
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: clueRowCount }, (_, clueIndex) => (
                    <tr key={clueIndex}>
                        {categories.map((category, categoryIndex) => {
                            const clue = category.clues[clueIndex];

                            if (!clue) {
                                return (
                                    <td
                                        key={`empty-${category.name || categoryIndex}-${clueIndex}`}
                                        className={styles.boardEmptyCell}
                                        aria-hidden="true"
                                    />
                                );
                            }

                            return (
                                <ClueCard
                                    key={`clue-${category.name || categoryIndex}-${clueIndex}`}
                                    value={(clueIndex + 1) * baseValue}
                                    clue={clue}
                                    onClueFinished={handleClueComplete}
                                />
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
