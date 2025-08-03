// components/evaluation/PitchEvaluator.jsx
import React, { useState } from 'react';
import { usePerplexity } from '../../hooks/usePerplexity';

const PitchEvaluator = ({ pitchId, onEvaluationComplete }) => {
    const [evaluating, setEvaluating] = useState(false);
    const [result, setResult] = useState(null);
    const { evaluatePitch } = usePerplexity();

    const handleEvaluate = async () => {
        setEvaluating(true);
        try {
            const evaluation = await evaluatePitch(pitchId);
            setResult(evaluation);
            onEvaluationComplete(evaluation);
        } catch (error) {
            console.error('Kiértékelési hiba:', error);
        } finally {
            setEvaluating(false);
        }
    };

    return (
        <div className="pitch-evaluator">
            {evaluating ? (
                <div className="evaluating">
                    <div className="spinner"></div>
                    <p>MI kiértékelés folyamatban...</p>
                </div>
            ) : result ? (
                <div className="evaluation-results">
                    <div className="score-display">
                        <h4>Összpontszám: {result.overallScore}/100</h4>
                    </div>
                    
                    <div className="criteria-breakdown">
                        <h5>Részletes értékelés:</h5>
                        {Object.entries(result.criteriaScores).map(([key, score]) => (
                            <div key={key} className="criteria-item">
                                <span>{this.getCriteriaLabel(key)}</span>
                                <span>{score} pont</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="feedback">
                        <h5>Visszajelzés:</h5>
                        <p>{result.feedback}</p>
                        
                        <div className="strengths">
                            <h6>Erősségek:</h6>
                            <ul>
                                {result.strengths.map((strength, index) => (
                                    <li key={index}>{strength}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="improvements">
                            <h6>Fejlesztendő területek:</h6>
                            <ul>
                                {result.improvements.map((improvement, index) => (
                                    <li key={index}>{improvement}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <button onClick={handleEvaluate} className="evaluate-btn">
                    Kiértékelés indítása
                </button>
            )}
        </div>
    );
};
