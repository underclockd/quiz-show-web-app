export const appName = "Trivia Show App";
export const appDescription = "Play any archived Jeopardy! game.";

const localMetadataBase = "http://localhost:3000";

function withProtocol(url: string) {
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export function getMetadataBase() {
    const url = [
        process.env.SITE_URL,
        process.env.VERCEL_PROJECT_PRODUCTION_URL,
        process.env.VERCEL_URL,
        localMetadataBase,
    ].find((value): value is string => Boolean(value)) ?? localMetadataBase;

    return new URL(withProtocol(url));
}
