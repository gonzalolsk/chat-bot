import { GEMINI_API_KEY, PROMPT } from '../constants'

export async function sendQuestion(question){
    const answer = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${ GEMINI_API_KEY }`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                "contents": [
                {
                    "parts": [
                        {
                        "text": ` ${PROMPT}
                        Question:${question}
                        \n\nAnswer:`
                        }
                    ]
                    }
                ],
                "generationConfig": {
                "temperature": 1,
                "topK": 0,
                "topP": 0.95,
                "maxOutputTokens": 200,
                "stopSequences": []
                },
                "safetySettings": [
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                }
                ]
            }
        )
    }).then(res => res.json() )
    .then(data => data.candidates[0].content.parts[0].text)

    return answer
}