import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import ValuesSelection from "./components/ValuesSelection";
import NarrowSelection from "./components/NarrowSelection";
import BeliefExperiences from "./components/BeliefExperiences";
import LevelScreen from "./components/LevelScreen";
import Level2Worldview from "./components/Level2Worldview"; // Import new component
import "./App.css";

function App() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [step, setStep] = useState(0); // 0: Home, 0.5: Level1 Intro, 1: Values, 2: Narrow, 3: Belief, 4: Worldview, 5: Questions
  const [experiences, setExperiences] = useState({});
  const [worldviewRatings, setWorldviewRatings] = useState({}); // New state for Level 2: Worldview

  const questions = [
    "What is your proudest achievement?",
    "What is your biggest mistake?",
    "What was your favorite childhood memory?",
    "What fears or challenges do you find the most difficult to overcome?",
  ];

  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("answers");
    return saved ? JSON.parse(saved) : {};
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [reviewing, setReviewing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  const handleAnswerChange = (question, newAnswer) => {
    setAnswers(prev => ({ ...prev, [question]: newAnswer }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setReviewing(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Final Answers:", answers);
    console.log("Belief Experiences:", experiences);
    console.log("Worldview Ratings:", worldviewRatings);
    setSubmitted(true);
  };

  const restartSurvey = () => {
    setAnswers({});
    setSelectedValues([]);
    setExperiences({});
    setWorldviewRatings({});
    setCurrentQuestionIndex(0);
    setReviewing(false);
    setSubmitted(false);
    setStep(0);
    localStorage.removeItem("answers");
  };

  return (
    <div className="app-container">
      {step === 0 ? (
        /* Home Screen */
        <div>
          <h1>10 Levels Deep</h1>
          <p>
            Welcome to the self-reflection survey. Discover your core values
            and explore what shapes your life.
          </p>
          <button onClick={() => setStep(0.5)}>Start Survey</button>
        </div>
      ) : step === 0.5 ? (
        /* Level 1 Intro Screen */
        <LevelScreen level="Level 1: Values" onFinish={() => setStep(1)} />
      ) : submitted ? (
        <div>
          <h2>Thank You!</h2>
          <p>Your answers have been recorded.</p>
          <button onClick={restartSurvey}>Restart</button>
          <button onClick={() => { setReviewing(true); setSubmitted(false); }}>
            Review Answers
          </button>
        </div>
      ) : reviewing ? (
        <div>
          <h2>Review Your Answers</h2>
          {questions.map(q => (
            <p key={q}>
              <strong>{q}</strong>: {answers[q] || "(No answer)"}
            </p>
          ))}
          <h2>Review Selected Values & Experiences</h2>
          {selectedValues.map(value => (
            <p key={value}>
              <strong>{value}</strong>: {experiences[value] || "(No experience provided)"}
            </p>
          ))}
          <button onClick={() => setReviewing(false)}>Edit Answers</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : step === 1 ? (
        <ValuesSelection
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          setStep={setStep}
        />
      ) : step === 2 ? (
        <NarrowSelection
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          setStep={setStep}
        />
      ) : step === 3 ? (
        <BeliefExperiences
          selectedValues={selectedValues}
          experiences={experiences}
          setExperiences={setExperiences}
          setStep={setStep}
        />
      ) : step === 4 ? (
        /* New Level 2: Worldview Screen */
        <Level2Worldview
          worldviewRatings={worldviewRatings}
          setWorldviewRatings={setWorldviewRatings}
          setStep={setStep}
        />
      ) : step === 5 ? (
        /* Questions Screen */
        <>
          <Question
            text={questions[currentQuestionIndex]}
            answer={answers[questions[currentQuestionIndex]] || ""}
            onAnswerChange={handleAnswerChange}
          />
          <div>
            {currentQuestionIndex > 0 && (
              <button onClick={prevQuestion}>Back</button>
            )}
            <button onClick={nextQuestion}>
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Review"}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
