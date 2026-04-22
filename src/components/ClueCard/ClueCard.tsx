"use client";
import type { CSSProperties } from "react";
import { useRef, useState } from "react";

import type { Clue } from "@/db/types";
import styles from "./ClueCard.module.css";

type FullscreenOrigin = {
    translateX: number;
    translateY: number;
    scaleX: number;
    scaleY: number;
};

export default function ClueCard({ value, clue, onClueFinished }: { value: number, clue: Clue, onClueFinished: () => void }) {
    // 0: Dollar value displayed
    // 1: Prompt displayed with opening animation
    // 2: Answer displayed
    // 3: Clue completed and removed from the board
    const [clickStage, setClickState] = useState(0);
    const [fullscreenOrigin, setFullscreenOrigin] = useState<FullscreenOrigin | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const fullscreenStyle = fullscreenOrigin ? {
        "--fullscreen-origin-translate-x": `${fullscreenOrigin.translateX}px`,
        "--fullscreen-origin-translate-y": `${fullscreenOrigin.translateY}px`,
        "--fullscreen-origin-scale-x": fullscreenOrigin.scaleX,
        "--fullscreen-origin-scale-y": fullscreenOrigin.scaleY,
    } as CSSProperties : undefined;

    // When the answer is revealed, update the revealedCount from GameBoard
    const handleClick = () => {
        switch (clickStage) {
            case 0:
                if (cardRef.current) {
                    const cardBounds = cardRef.current.getBoundingClientRect();
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;

                    setFullscreenOrigin({
                        translateX: cardBounds.left,
                        translateY: cardBounds.top,
                        scaleX: cardBounds.width / viewportWidth,
                        scaleY: cardBounds.height / viewportHeight,
                    });
                }

                setClickState(1);
                break;
            case 1:
                setClickState(2);
                break;
            case 2:
                setFullscreenOrigin(null);
                setClickState(3);
                onClueFinished();
                break;

        }
    };

    return (
        <>
            {clickStage === 0 && (
                <div ref={cardRef} className={styles.clueCard} onClick={handleClick}>
                    ${value}
                </div>
            )}

            {(clickStage === 1 || clickStage === 2 || clickStage === 3) && (
                <div className={styles.emptySlot} aria-hidden="true" />
            )}

            {(clickStage === 1 || clickStage === 2) && (
                <div
                    className={styles.fullscreenCard}
                    style={fullscreenStyle}
                    onClick={handleClick}
                >
                    <div className={styles.fullscreenContent}>
                        {clickStage === 1 ? clue.text : clue.response}
                    </div>
                </div>
            )}
        </>
    );
}
