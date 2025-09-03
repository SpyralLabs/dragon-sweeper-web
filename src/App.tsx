import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="font-pixel">
      <div className="flex justify-center gap-8">
        <a href="https://vite.dev" target="_blank" className="block">
          <img
            src={viteLogo}
            className="h-24 w-24 transition-all hover:drop-shadow-lg"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" className="block">
          <img
            src={reactLogo}
            className="h-24 w-24 animate-spin transition-all hover:drop-shadow-lg"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="my-8 text-center text-4xl font-bold">Vite + React</h1>
      <div className="text-center">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-600">
          Edit <code className="rounded bg-gray-100 px-2 py-1 text-sm">src/App.tsx</code> and save
          to test HMR
        </p>
      </div>
      <p className="mt-8 text-center text-gray-500">
        Click on the Vite and React logos to learn more
      </p>

      {/* Font Test Section */}
      <div className="mt-8 rounded-lg bg-gray-50 p-6">
        <h2 className="mb-4 text-center text-xl font-bold">Pixel Arial Font Test</h2>
        <p className="mb-2 text-base font-normal">
          Font Test: This text should appear in Pixel Arial 11 (400 weight)
        </p>
        <p className="text-base font-extrabold">
          Font Test: This text should appear in Pixel Arial 11 (800 weight)
        </p>
        <p className="mt-4 text-sm font-normal text-gray-600">
          All text elements now use the custom Pixel Arial font through Tailwind CSS 4 configuration
        </p>
      </div>
    </div>
  );
}

export default App;
