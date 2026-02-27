chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "OPTIMIZE_PROMPT") {
        fetch("https://llm-prompt-optimiser.vercel.app/api/optimize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ raw_prompt: request.payload })
        })
            .then(res => res.json())
            .then(data => sendResponse({ optimized_prompt: data.optimized_prompt }))
            .catch(err => sendResponse({ error: err.toString() }));
        return true;
    }
});
