const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({});

const optimizePrompt = async (req, res) => {
    const { raw_prompt } = req.body;
    if (!raw_prompt) {
        return res.status(400).json({ error: 'raw_prompt is required' });
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: raw_prompt,
            config: {
                systemInstruction: 'You are an expert prompt engineer. The user will provide a raw prompt intended for an LLM. Rewrite it to be highly detailed, structured, and optimized for maximum performance. Return ONLY the optimized text, without any conversational filler or markdown formatting.'
            }
        });

        const optimized_prompt = response.text;
        return res.json({ optimized_prompt });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to optimize prompt' });
    }
};

module.exports = {
    optimizePrompt
};
