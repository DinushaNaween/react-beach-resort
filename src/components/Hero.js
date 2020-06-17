import React from 'react';

export default function Hero({ children, hero }) {
  return <header className={hero}></header>
}

Hero.defaultProps = {
  hero: 'defaultHero'
};