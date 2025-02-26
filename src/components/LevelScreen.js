import React, { useEffect } from "react";

function LevelScreen({ level, onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); // 2-second delay
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="level-screen">
      <h2>{level}</h2>
    </div>
  );
}

export default LevelScreen;
