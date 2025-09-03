import React from 'react';

/**
 * Font Demo Component
 * Demonstrates how to use the custom Pixel Arial font with Tailwind CSS 4
 */
export const FontDemo: React.FC = () => {
  return (
    <div className="font-pixel rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-2xl font-bold">Pixel Arial Font Demo</h1>

      <div className="space-y-4">
        <p className="font-normal">
          Regular weight (400): This text uses Pixel Arial with normal font weight
        </p>

        <p className="font-extrabold">
          Bold weight (800): This text uses Pixel Arial with extra bold font weight
        </p>

        <div className="rounded bg-gray-100 p-4">
          <h2 className="mb-2 text-lg font-bold">Usage Examples:</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <code className="rounded bg-gray-200 px-2 py-1">className="font-sans"</code> - Uses
              Pixel Arial (default)
            </li>
            <li>
              <code className="rounded bg-gray-200 px-2 py-1">className="font-pixel"</code> -
              Explicitly uses Pixel Arial
            </li>
            <li>
              <code className="rounded bg-gray-200 px-2 py-1">className="font-normal"</code> - 400
              weight
            </li>
            <li>
              <code className="rounded bg-gray-200 px-2 py-1">className="font-extrabold"</code> -
              800 weight
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FontDemo;
