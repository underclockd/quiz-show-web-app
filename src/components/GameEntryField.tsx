"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./GameEntryField.module.css";

export default function GameEntryField() {
    const router = useRouter();

    const [requestedID, setRequestedID] = useState("");
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawVal = e.target.value;
        if (rawVal === "") {
            setRequestedID("");
            return;
        }
        const numericVal = parseInt(rawVal, 10);

        if (!isNaN(numericVal) && numericVal > 0)
            setRequestedID(e.target.value);
    };

    const loadGame = () => {
        const numericGameID = parseInt(requestedID, 10);
        if (!isNaN(numericGameID))
            router.push(`/game/${requestedID}`);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loadGame();
    };

    return (
        <form className={styles.entryForm} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                id="game-id-input"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                placeholder="4165"
                value={requestedID}
                onChange={handleSearch}
            />
            <button className={styles.button} type="submit" disabled={requestedID === ""}>
                Play
            </button>
            <div className={styles.hint}>Load any board from the J! Archive</div>
        </form>
    );
}