import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from '@/pages/home';
import OnboardingCharacterPage from '@/pages/onboarding/character';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/onboarding/character" element={<OnboardingCharacterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
