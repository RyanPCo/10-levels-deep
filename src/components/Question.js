import React, { useState } from "react";

function Question({ text, answer, onAnswerChange}) {
    return (
        <div>
            <h3>{text}</h3>
            <input
                type="text"
                placeholder="Your answer..."
                value={answer}
                onChange={(event) => onAnswerChange(text, event.target.value)}
            />
            <p>Your Answer: {answer}</p>
        </div>
    );
}

export default Question;
