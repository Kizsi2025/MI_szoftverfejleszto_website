// src/components/Quiz.jsx
import React, { useState } from 'react';
import './Quiz.css';

const questions = [
  {
    id: 1,
    question: 'Mi a célja a gyenge MI-nek (Weak AI)?',
    options: [
      'Általános, emberi szintű gondolkodás megvalósítása',
      'Egyetlen, jól körülhatárolt feladatra specializálódás',
      'Minden intellektuális feladat önálló elvégzése',
      'Meta-tanulás és önálló fejlődés'
    ],
    correctIndex: 1
  },
  {
    id: 2,
    question: 'Melyik eszköz képes kódrészletek automatikus generálására?',
    options: [
      'GitHub Copilot',
      'Midjourney',
      'Axios',
      'Framer Motion'
    ],
    correctIndex: 0
  },
  {
    id: 3,
    question: 'Milyen technológia segít a képgenerálásban a lecke szerint?',
    options: [
      'DALL-E',
      'Express.js',
      'Helmet',
      'React Router'
    ],
    correctIndex: 0
  }
];

export default function Quiz({ onPassed }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleOptionClick = idx => {
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === q.correctIndex) {
      setScore(prev => prev + 5);  // +5 TIP minden helyes válaszért
    }
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setSelected(null);
  };

  return (
    <div className="quiz-container">
      {!finished ? (
        <>
          <h3>Kérdés {current + 1} / {questions.length}</h3>
          <p className="quiz-question">{q.question}</p>
          <div className="quiz-options">
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`quiz-option ${selected === i ? 'selected' : ''}`}
                onClick={() => handleOptionClick(i)}
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            className="quiz-next"
            onClick={handleNext}
            disabled={selected === null}
          >
            {current + 1 < questions.length ? 'Következő' : 'Eredmény'}
          </button>
        </>
      ) : (
        <div className="quiz-result">
          <h3>Elért TIP pontszám: {score}</h3>
          {score === questions.length * 5 ? (
            <>
              <p className="quiz-success">Gratulálunk! Minden kérdésre helyesen válaszoltál.</p>
              <button className="quiz-continue" onClick={onPassed}>
                Tovább a következő modulhoz
              </button>
            </>
          ) : (
            <>
              <p className="quiz-fail">Sajnos nem sikerült elérni a maximális TIP pontszámot. Próbáld újra!</p>
              <button className="quiz-restart" onClick={handleRestart}>
                Újrapróbálkozás
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
