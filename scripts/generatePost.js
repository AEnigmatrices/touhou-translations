const fs = require("fs");
const readline = require("readline");
const path = require("path");

const prompt = (question) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
};

const main = async () => {
    const dateInput = await prompt("Enter UNIX timestamp (e.g., 1747579319): ");
    const reddit = await prompt("Enter Reddit URL: ");
    const urlsInput = await prompt("Enter image URLs (comma separated): ");
    const src = await prompt("Enter source URL: ");
    const desc = await prompt("Enter description: ");
    const artistId = await prompt("Enter artist ID: ");
    const characterIdsInput = await prompt(
        "Enter character IDs (comma separated): "
    );

    const entry = {
        date: Number(dateInput),
        reddit,
        url: urlsInput
            .split(",")
            .map((u) => u.trim())
            .filter(Boolean),
        src,
        desc,
        artistId,
        characterIds: characterIdsInput
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean),
    };

    const postsPath = path.join(__dirname, "../data/posts.json");

    let posts = [];
    try {
        const data = fs.readFileSync(postsPath, "utf-8");
        posts = JSON.parse(data);
        if (!Array.isArray(posts)) {
            console.error("Error: posts.json does not contain a JSON array.");
            process.exit(1);
        }
    } catch (err) {
        console.error("Error reading posts.json:", err);
        process.exit(1);
    }

    posts.push(entry);

    try {
        fs.writeFileSync(postsPath, JSON.stringify(posts, null, 4), "utf-8");
        console.log("New post appended to posts.json successfully.");
    } catch (err) {
        console.error("Error writing to posts.json:", err);
        process.exit(1);
    }
};

main();
