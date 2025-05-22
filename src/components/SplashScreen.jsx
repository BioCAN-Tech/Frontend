import { useState } from "react";

function SplashScreen() {
  const [screen, setScreen] = useState(1);


  return (
    <>
      {screen === 1 && (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
          <div className="bg-dark bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-6 w-full max-w-sm text-center shadow-lg">
            <img
              src="/images/robo1.png"
              alt="Robot illustration"
              style={{ margin: "auto", display: "block" }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SplashScreen;
