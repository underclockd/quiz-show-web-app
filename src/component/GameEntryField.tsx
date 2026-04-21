"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// BRIEF: Temporary(?) component for searching db/scraping site
//        for user-inputted game ID.
export default function GameEntryField() {
    const router = useRouter();

    // The user-requested game ID
    const [requestedID, setRequestedID] = useState("");
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Ensure the input wasn't a blank string and is a positive integer.
        const rawVal = e.target.value;
        if (rawVal === "") {
            setRequestedID("");
            return;
        }
        const numericVal = parseInt(rawVal, 10);

        if (!isNaN(numericVal) && numericVal > 0)
            setRequestedID(e.target.value);
    }
    
    const loadGame = () => {
        const numericGameID = parseInt(requestedID, 10);
        if (!isNaN(numericGameID))
            router.push(`/game/${requestedID}`);
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0'}}>
            <label htmlFor="game-id-input" style={{ fontSize: '1.2rem', fontWeight: '500' }}>
                Input a game ID to play: 
            </label>
            <input 
            id="game-id-input"
            type="number" 
            min="1"
            step="1" 
            value={requestedID} 
            onChange={handleSearch} 
        />
        <button onClick={loadGame}>Play</button>
        </div>
    );

}