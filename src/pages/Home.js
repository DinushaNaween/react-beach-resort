import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRoms';
import { useContext } from 'react';
import { RoomContext } from '../Context';

export default function Home() {

  const context = useContext(RoomContext);
  const { minDeluxRoomPrice } = context;

  const welcomeText = `deluxe rooms starting at $${minDeluxRoomPrice}`;

  return (
    <>
      <Hero>
        <Banner title='Luxurious Rooms' subtitle={welcomeText}>
          <Link to='/rooms' className='btn-primary'>
            our rooms
          </Link>
        </Banner>
      </Hero>
      <Services />
      <FeaturedRooms />
    </>
  );
}