// services/perplexityService.js
class PerplexityEvaluationService {
    constructor() {
        this.apiKey = process.env.PERPLEXITY_API_KEY;
        this.baseUrl = 'https://api.perplexity.ai/chat/completions';
    }

    async evaluatePitch(pitchText, lessonContext) {
        const prompt = this.buildEvaluationPrompt(pitchText, lessonContext);
        
        try {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.1-sonar-small-128k-online',
                    messages: [
                        {
                            role: 'system',
                            content: 'Te egy szakképzett szoftverfejlesztési oktató vagy, aki MI/ML projekteket értékel.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 1000,
                    temperature: 0.3
                })
            });

            const result = await response.json();
            return this.parseEvaluation(result.choices[0].message.content);
        } catch (error) {
            console.error('Perplexity API hiba:', error);
            throw new Error('Kiértékelés sikertelen');
        }
    }

    buildEvaluationPrompt(pitchText, lessonContext) {
        return `
        Értékeld ki ezt a diák prezentációt a következő szempontok alapján:

        Lecke kontextus: ${lessonContext.title} - ${lessonContext.gameTheme}
        Célkitűzések: ${lessonContext.objectives.join(', ')}

        Diák pitch:
        "${pitchText}"

        Értékelési kritériumok (0-100 pont):
        1. Technikai pontosság (30 pont): Helyesen alkalmazta-e a tanult MI/ML koncepciókat?
        2. Problémamegoldás (25 pont): Releváns megoldást javasolt-e a problémára?
        3. Kreativitás (20 pont): Innovatív vagy egyedi megközelítést mutatott-e?
        4. Kommunikáció (15 pont): Világosan és érthetően fogalmazott-e?
        5. Gyakorlatiasság (10 pont): Megvalósítható-e a javasolt megoldás?

        Válaszolj JSON formátumban:
        {
            "overallScore": 0-100,
            "criteriaScores": {
                "technical": 0-30,
                "problemSolving": 0-25,
                "creativity": 0-20,
                "communication": 0-15,
                "practicality": 0-10
            },
            "feedback": "Részletes visszajelzés...",
            "strengths": ["erősség1", "erősség2"],
            "improvements": ["fejlesztendő terület1", "fejlesztendő terület2"]
        }
        `;
    }
}
