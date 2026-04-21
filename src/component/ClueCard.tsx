"use client";
import { useState } from "react";
import styles from "@/app/game/[id]/board.module.css";
import type { Clue } from "@/db/types";

// TODO: Make clue take up the entire screen when prompt is displayed.
export default function ClueCard({value, clue, onClueFinished}: {value: number, clue: Clue, onClueFinished: () => void}) {
    // 0: Dollar value displayed
    // 1: Prompt displayed
    // 2: Answer displayed
    const [clickStage, setClickState] = useState(0);

    // When the answer is revealed, update the revealedCount from GameBoard
    const handleClick = () => {
        switch (clickStage) {
            case 0:
                setClickState(1);
                break;
            case 1:
                setClickState(2);
                onClueFinished();
                break;

        }
    };

    let displayContent;
    switch (clickStage) {
        case 0:
            displayContent = `$${value}`;
            break;
        case 1:
            displayContent = clue.text;
            break;
        default:
            displayContent = clue.response;
            break;
    }

    return (
        <div className={styles.clueCard}>
            {clickStage === 0 && (
                <div 
                    onClick={handleClick}
                    style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                    ${value}
                </div>
                    
            )}

            {clickStage > 0 && (
                <div className={styles.fullscreenCard} onClick={handleClick}>
                    {clickStage === 1 ? clue.text : clue.response}
                </div>
            )}
        </div>
    );

    return (
        <div 
            className={styles.clueCard}
            onClick={handleClick}
            style={{
                cursor: clickStage < 2 ? "pointer" : "default",
                fontSize: clickStage > 0 ? "1rem" : "2rem"
            }}
        >
            {displayContent}
        </div>
    );
}