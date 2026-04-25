"use client";
import { useRef, useState, type MouseEvent } from "react";

import ClueDialog, { type ClueDialogHandle } from "@/components/ClueDialog/ClueDialog";
import type { Clue } from "@/db/types";
import styles from "./ClueCard.module.css";

export default function ClueCard({ value, clue, onClueFinished }: { value: number, clue: Clue, onClueFinished: () => void }) {
    const [answered, setAnswered] = useState(false);
    const dialogRef = useRef<ClueDialogHandle>(null);

    const handleAnswered = () => {
        setAnswered(true);
        onClueFinished();
    };

    return (
        <>
            {answered ? (
                <td aria-hidden="true" style={{ visibility: "hidden" }}>${value}</td>
            ) : (
                <td
                    className={styles.clueCard}
                    role="button"
                    tabIndex={0}
                    aria-label={`$${value}`}
                    onClick={(e: MouseEvent<HTMLTableCellElement>) => {
                        dialogRef.current?.open(e.currentTarget.getBoundingClientRect());
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            (e.currentTarget as HTMLTableCellElement).click();
                        }
                    }}
                >
                    ${value}
                    <ClueDialog ref={dialogRef} clue={clue} onAnswered={handleAnswered} />
                </td>
            )}
        </>
    );
}
