import React, { useState, useEffect } from "react";
import Question from "./components/Question";

function App() {
  const questions = [
    "What is your proudest achievement?",
    "What is your biggest mistake?",
    "What was your favorite childhood memory?",
    "What fears or challenges do you find the most difficult to overcome?",
  ];

  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem("answers");
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [reviewing, setReviewing] = useState(false); // New: Track if we are in review mode

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  const handleAnswerChange = (question, newAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: newAnswer,
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setReviewing(true); // Move to review mode after the last question
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div>
      <h1>10 Levels Deep</h1>

      {/* If reviewing, show review screen */}
      {reviewing ? (
        <div>
          <h2>Review Your Answers</h2>
          {questions.map((q) => (
            <p key={q}>
              <strong>{q}</strong>: {answers[q] || "(No answer)"}
            </p>
          ))}
          <button onClick={() => setReviewing(false)}>Edit Answers</button>
          <button onClick={() => console.log("Submitted:", answers)}>Submit</button>
        </div>
      ) : (
        <>
          {/* Progress Indicator */}
          <p>Question {currentQuestionIndex + 1} of {questions.length}</p>

          {/* Progress Bar */}
          <div style={{ background: "#ddd", height: "10px", width: "100%" }}>
            <div
              style={{
                background: "blue",
                height: "100%",
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
              }}
            />
          </div>

          {/* Show Current Question */}
          <Question
            text={questions[currentQuestionIndex]}
            answer={answers[questions[currentQuestionIndex]] || ""}
            onAnswerChange={handleAnswerChange}
          />

          {/* Navigation Buttons */}
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            {currentQuestionIndex > 0 && (
              <button onClick={prevQuestion}>Back</button>
            )}
            
            <button onClick={nextQuestion}>
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Review"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
