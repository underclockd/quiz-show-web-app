"use client";
import { useState } from "react";

import styles from "@/app/game/[id]/board.module.css";
import { Category } from "@/db/types";
import { Board } from "@/db/types";
import CategoryColumn from "@/component/CategoryColumn";

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

export default function GameBoard({ gameData }: {gameData: Board}) {
    // Current round of the game
    const [currentRound, setCurrentRound] = useState<'single' | 'double' | 'final'>('single');

    // Number of clues fully revealed (answer shown)
    const [revealedCount, setRevealedCount] = useState(0);

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
            if (newCount >= totalClues)
            {
                switch (currentRound)
                {
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
    return (
        <div className={styles.boardContainer}>
            {/* Construct the category columns. Clues are created when each column is created. */}
            {gameData[currentRound]?.categories?.map((data, index) => {
                return (
                    <CategoryColumn key={data.name || index} categoryData={data} clueCompleteHandler={handleClueComplete} baseValue={baseValue} />
                );
            })}
        </div>
    );
}
