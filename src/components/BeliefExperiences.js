import React from "react";

function BeliefExperiences({ selectedValues, experiences, setExperiences, setStep }) {
  const handleChange = (value, event) => {
    setExperiences({
      ...experiences,
      [value]: event.target.value,
    });
  };

  return (
    <div>
      <h2>Which experiences have influenced your core beliefs?</h2>
      {selectedValues.map(value => (
        <div key={value}>
          <h4>{value}</h4>
          <input
            type="text"
            placeholder={`Describe experience for ${value}...`}
            value={experiences[value] || ""}
            onChange={event => handleChange(value, event)}
          />
        </div>
      ))}
      <div>
        <button onClick={() => setStep(2)}>Back</button>
        <button onClick={() => setStep(4)}>Next</button>
      </div>
    </div>
  );
}

export default BeliefExperiences;
