import React from "react";

const statements = [
  "People are inherently good",
  "Success is determined more by effort than by luck",
  "Society has a responsibility to care for its most vulnerable members",
  "People should prioritize the needs of others over their own",
  "Everyone has a purpose in life that they must discover",
  "Happiness is the ultimate goal in life",
  "Suffering is an essential part of human growth",
  "The world is becoming a better place over time",
  "Conflict is part of human nature",
  "Collective well-being is more important than individual freedom",
  "A higher power or divine force governs the universe",
  "Equality of opportunity is more important than equality of outcome",
  "Everyone deserves a second chance",
  "Relationships are more important than achievements",
  "Altruism is inherently selfish"
];

const newRatingOptions = [
  "Strongly Disagree",
  "Disagree",
  "Slightly Disagree",
  "Neutral",
  "Slightly Agree",
  "Agree",
  "Strongly Agree"
];

function Level2Worldview({ worldviewRatings, setWorldviewRatings, setStep }) {
  const centerIndex = Math.floor(newRatingOptions.length / 2);
  const baseSize = 16; // px for center circle
  const sizeIncrement = 4; // additional px per step from center

  const handleChange = (statement, value) => {
    setWorldviewRatings({ ...worldviewRatings, [statement]: value });
  };

  return (
    <div>
      <h2>Level 2: Worldview</h2>
      <p>
        Rank each statement by selecting a circle from “Strongly Disagree”
        (left) to “Strongly Agree” (right).
      </p>
      {/* Scrollable container for statements */}
      <div className="worldview-container">
        {statements.map((stmt) => (
          <div key={stmt} style={{ marginBottom: "1rem", textAlign: "left" }}>
            <p>{stmt}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {newRatingOptions.map((option, index) => {
                const diff = Math.abs(index - centerIndex);
                const size = baseSize + diff * sizeIncrement;
                const isSelected = worldviewRatings[stmt] === option;
                return (
                  <label
                    key={option}
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      flex: "1",
                    }}
                  >
                    <input
                      type="radio"
                      name={stmt}
                      value={option}
                      style={{ display: "none" }}
                      checked={isSelected}
                      onChange={(e) => handleChange(stmt, e.target.value)}
                    />
                    <span
                      className="custom-radio-scale"
                      style={{
                        display: "inline-block",
                        width: `${size}px`,
                        height: `${size}px`,
                        borderRadius: "50%",
                        border: `2px solid var(--accent-color)`,
                        backgroundColor: isSelected
                          ? "var(--accent-color)"
                          : "transparent",
                        transition:
                          "background-color 0.3s, transform 0.3s",
                      }}
                      onMouseOver={(e) => {
                        if (!isSelected)
                          e.currentTarget.style.backgroundColor =
                            "var(--accent-color)";
                      }}
                      onMouseOut={(e) => {
                        if (!isSelected)
                          e.currentTarget.style.backgroundColor =
                            "transparent";
                      }}
                    ></span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setStep(3)}>Back</button>
        <button onClick={() => setStep(5)}>Next</button>
      </div>
    </div>
  );
}

export default Level2Worldview;
