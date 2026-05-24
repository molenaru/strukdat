import React from 'react';
import { getItems } from './backend/array'; 

const ArrayComponent: React.FC = () => {
  const items = getItems(); 

  return (
    <div className="bg-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Fruits</h2>
      <ul className="list-disc text-black">
        {items.map((item, index) => (
          <li key={index} className="mb-1">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArrayComponent;
