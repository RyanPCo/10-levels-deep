import React from "react";

const coreValues = [
  "Integrity", "Honesty", "Kindness", "Courage", "Wisdom",
  "Loyalty", "Creativity", "Compassion", "Discipline", "Gratitude",
  "Freedom", "Respect", "Humility", "Responsibility", "Ambition",
  "Patience", "Love", "Perseverance", "Trust", "Empathy",
  "Optimism", "Mindfulness", "Justice", "Innovation", "Authenticity",
  "Generosity", "Determination", "Adaptability", "Curiosity", "Optimism"
];

function ValuesSelection({ selectedValues, setSelectedValues, setStep }) {
  const handleSelect = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else if (selectedValues.length < 10) {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <div>
      <h2>What are your core values? (Pick 10)</h2>
      <div className="values-grid">
        {coreValues.map((value) => (
          <div
            key={value}
            className={`value-label ${selectedValues.includes(value) ? "selected" : ""}`}
            onClick={() => handleSelect(value)}
          >
            {value}
          </div>
        ))}
      </div>
      <button disabled={selectedValues.length < 10} onClick={() => setStep(2)}>
        Next
      </button>
    </div>
  );
}

export default ValuesSelection;
