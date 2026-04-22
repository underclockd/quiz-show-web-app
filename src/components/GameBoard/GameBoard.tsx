"use client";
import type { CSSProperties } from "react";
import { useLayoutEffect, useRef, useState } from "react";

import ClueCard from "@/components/ClueCard/ClueCard";
import { Board, Category } from "@/db/types";
import styles from "./GameBoard.module.css";

const BOARD_HEADER_MAX_FONT_SIZE_REM = 2.2;
const BOARD_HEADER_MIN_FONT_SIZE_REM = 1.0;
const BOARD_HEADER_FONT_SIZE_TOLERANCE_REM = 0.01;

function CategoryHeader({ title }: { title: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const isSingleWord = title.trim().split(/\s+/).filter(Boolean).length <= 1;

    useLayoutEffect(() => {
        const container = containerRef.current;
        const text = textRef.current;

        if (!container || !text) {
            return;
        }

        let frame = 0;

        const fitText = () => {
            const currentContainer = containerRef.current;
            const currentText = textRef.current;

            if (!currentContainer || !currentText) {
                return;
            }

            const containerStyle = getComputedStyle(currentContainer);
            const availableWidth = currentContainer.clientWidth
                - parseFloat(containerStyle.paddingLeft)
                - parseFloat(containerStyle.paddingRight);
            const availableHeight = currentContainer.clientHeight
                - parseFloat(containerStyle.paddingTop)
                - parseFloat(containerStyle.paddingBottom);
            const maxLines = isSingleWord ? 1 : 3;

            const fitsAt = (fontSize: number) => {
                currentContainer.style.setProperty("--board-header-font-size", `${fontSize}rem`);

                const textStyle = getComputedStyle(currentText);
                const lineHeight = parseFloat(textStyle.lineHeight);
                const textHeight = currentText.getBoundingClientRect().height;
                const textLineCount = lineHeight > 0
                    ? Math.ceil(textHeight / lineHeight)
                    : 1;
                const overWidth = isSingleWord
                    ? currentText.scrollWidth > availableWidth + 1
                    : false;
                const overHeight = textHeight > availableHeight + 1;

                return !overWidth && !overHeight && textLineCount <= maxLines;
            };

            let low = BOARD_HEADER_MIN_FONT_SIZE_REM;
            let high = BOARD_HEADER_MAX_FONT_SIZE_REM;

            if (!fitsAt(low)) {
                currentContainer.style.setProperty(
                    "--board-header-font-size",
                    `${BOARD_HEADER_MIN_FONT_SIZE_REM}rem`,
                );
                return;
            }

            if (fitsAt(high)) {
                return;
            }

            while (high - low > BOARD_HEADER_FONT_SIZE_TOLERANCE_REM) {
                const mid = (low + high) / 2;

                if (fitsAt(mid)) {
                    low = mid;
                } else {
                    high = mid;
                }
            }

            currentContainer.style.setProperty(
                "--board-header-font-size",
                `${low.toFixed(3)}rem`,
            );
        };

        const scheduleFit = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(fitText);
        };

        scheduleFit();

        const resizeObserver = new ResizeObserver(scheduleFit);
        resizeObserver.observe(container);

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
        };
    }, [isSingleWord, title]);

    return (
        <div ref={containerRef} className={styles.boardHeader}>
            <span
                ref={textRef}
                className={isSingleWord ? `${styles.boardHeaderText} ${styles.singleLineHeaderText}` : styles.boardHeaderText}
            >
                {title}
            </span>
        </div>
    );
}

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
        <div
            className={styles.boardContainer}
            style={{ "--board-row-count": clueRowCount + 1 } as CSSProperties}
        >
            {categories.map((category, index) => (
                <CategoryHeader key={`header-${category.name || index}`} title={category.name || ""} />
            ))}

            {Array.from({ length: clueRowCount }, (_, clueIndex) => (
                categories.map((category, categoryIndex) => {
                    const clue = category.clues[clueIndex];

                    if (!clue) {
                        return (
                            <div
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
                })
            ))}
        </div>
    );
}
