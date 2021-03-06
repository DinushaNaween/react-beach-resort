import React from 'react';
import { useContext } from 'react';
import { RoomContext } from '../Context';
import Title from './Title';

const getUnique = (item, value) => {
  return [...new Set(item.map(item => item[value]))]
}

const wordCapitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function RoomFilter({ rooms }) {

  const context = useContext(RoomContext);
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets
  } = context;

  let types = getUnique(rooms, 'type');
  types = ['All', ...types];
  types = types.map((item, index) => {
    return (
      <option value={item} key={index} className='filter-option'>
        {wordCapitalize(item)}
      </option>
    );
  });

  let people = getUnique(rooms, 'capacity');
  people = people.map(item => {
    return parseInt(item);
  })

  people.sort(function(item1, item2) {
    if (item1 > item2) return 1;
    if (item1 < item2) return -1;
    return 0;
  });

  people = people.map((item, index) => {
    return <option key={index} value={item}>{item}</option>
  })

  return (
    <section className='filter-container'>
      <Title title='search rooms' />
      <form className='filter-form'>

        {/* select type */}
        <div className='form-group'>
          <label htmlFor='type'>Room Type</label>
          <select name='type' id='type' value={type} className='form-control' onChange={handleChange}>
            {types}
          </select>
        </div>
        {/* end of select type */}

        {/* select capacity */}
        <div className='form-group'>
          <label htmlFor='capacity'>Guests</label>
          <select name='capacity' id='capacity' value={capacity} className='form-control' onChange={handleChange}>
            {people}
          </select>
        </div>
        {/* end of select capacity */}

        {/* select price */}
        <div className='form-group'>
          <label htmlFor='price'>room price ${price}</label>
          <input type='range' name='price' min={minPrice} max={maxPrice} id='price' value={price} onChange={handleChange} className='form-control'></input>
        </div>
        {/* end of select price */}

        {/* select size */}
        <div className='form-group'>
          <label htmlFor='size'>room size</label>
          <div className='size-inputs'>
            <input type='number' name='minSize' id='size' value={minSize} onChange={handleChange} className='size-input' />
            <input type='number' name='maxSize' id='size' value={maxSize} onChange={handleChange} className='size-input' />
          </div>
        </div>
        {/* end of select size */}

        {/* extras */}
        <div className='form-group'>
          <div className='single-extra'>
            <input type='checkbox' name='breakfast' id='breakfast' checked={breakfast} onChange={handleChange} />
            <label htmlFor='breakfast'> breakfast</label>
          </div>

          <div className='single-extra'>
            <input type='checkbox' name='pets' id='pets' checked={pets} onChange={handleChange} />
            <label htmlFor='pets'> pets</label>
          </div>
          {/* end of extras */}
        </div>
      </form>
    </section>
  )
}