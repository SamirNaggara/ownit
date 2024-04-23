// Importations de React et Tailwind CSS
import React from 'react';

// Définition des props que le composant attend
interface ToggleProductStateButtonProps {
  productStateValue: number;
  handleChangeProductState: (newState: number) => void;
}

// Composant fonctionnel ToggleProductStateButton
const ToggleProductStateButton: React.FC<ToggleProductStateButtonProps> = ({
  productStateValue,
  handleChangeProductState,
}) => {
  return (
    <button
      className="bg-green-700 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 block mx-auto my-4 text-xl"
      type="button"
      onClick={() => handleChangeProductState(productStateValue === 0 ? 1 : 0)}
    >
      {productStateValue === 0 ? 'Déclarer volé' : 'Déclarer légit'}
    </button>
  );
};

export default ToggleProductStateButton;
