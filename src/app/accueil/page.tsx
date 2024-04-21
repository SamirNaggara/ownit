import React from 'react';

import S_hero from './sections/S_hero';
import S_auth from './sections/S_auth';
import S_stolen from './sections/S_stolen';
import S_contact from './sections/S_contact';

export default function Accueil() {
  return (
    <div className="homeContainer">
      <S_hero />
      <S_auth />
      <S_stolen />
      <S_contact />
    </div>
  );
}
