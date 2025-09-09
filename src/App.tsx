import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from '@/pages/home';
import OnboardingCharacterPage from '@/pages/onboarding/character';
import GamePage from '@/pages/game';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/onboarding/character" element={<OnboardingCharacterPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
