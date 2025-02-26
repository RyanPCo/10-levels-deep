import React, { useState } from "react";

function NarrowSelection({ selectedValues, setSelectedValues, setStep }) {
  const [finalValues, setFinalValues] = useState([]);

  const handleCheckboxChange = (value) => {
    if (finalValues.includes(value)) {
      setFinalValues(finalValues.filter(v => v !== value)); // Remove if already selected
    } else if (finalValues.length < 5) {
      setFinalValues([...finalValues, value]); // Add value
    }
  };

  return (
    <div>
      <h2>Now, Narrow Down to 5</h2>
      <div className="values-grid">
        {selectedValues.map((value) => (
          <div
            key={value}
            className={`value-label ${finalValues.includes(value) ? "selected" : ""}`}
            onClick={() => handleCheckboxChange(value)}
          >
            {value}
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setStep(1)}>Back</button>
        <button 
          disabled={finalValues.length < 5} 
          onClick={() => {
            setSelectedValues(finalValues);
            setStep(3); // Move to next step (questions)
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default NarrowSelection;
