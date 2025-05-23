import { Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import AssessmentCard from './components/AssessmentScreen';
import QuestionnaireScreen from './components/QuestionnaireScreen';
import Question1 from './components/Question1';
import AssessmentOnboardingCard from './components/AssessmentOnboardingCard';
import PostCardFlipper from './components/PostCardFlipper';


function App() {
  const [screen, setScreen] = useState('splash');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setScreen('welcome'), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (screen === 'splash') return <SplashScreen />;

  return (

    <PostCardFlipper/>
//     <Routes>
//   <Route path="/" element={<WelcomeScreen setUser={setUser} />} />
//   <Route path="/assessment" element={<AssessmentCard userName={user?.name} />} />
//   <Route path="/questionnaire" element={<QuestionnaireScreen />} />
//   <Route path="/question1" element={<Question1 />} />
//   <Route path="/assessmentonboardingcard" element={<AssessmentOnboardingCard/>} />
// </Routes>
  );
}

export default App;
