import React, { Component } from 'react';
import Client from './Contentful';

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'All',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minDeluxRoomPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  getData = async() => {
    try {
      let response = await Client.getEntries({
        content_type: 'beachResortProject',
        order: 'fields.type'
      });

      console.log(response);

      let rooms = this.formatData(response.items);
      let featuredRooms = rooms.filter(room => room.featured === true);
      let deluxRooms = rooms.filter(room => room.name.includes('delux') === true);

      let maxPrice = Math.max(...rooms.map(room => room.price));
      let maxSize = Math.max(...rooms.map(room => room.size));
      let minDeluxRoomPrice = Math.min(...deluxRooms.map(room => room.price));

      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        minDeluxRoomPrice,
        maxSize
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getData()
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = { ...item.fields, images, id };

      return room;
    });

    return tempItems;
  }

  getRoom = slug => {
    let tempRooms = [...this.state.rooms];

    const room = tempRooms.find(room => room.slug === slug);
    return room;
  }

  handleChange = event => {
    const target = event.target;    
    const value = target.type === 'checkbox'? target.checked: target.value;
    const name = event.target.name;

    this.setState(
      {
        [name]: value
      }, 
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms, 
      type, 
      capacity,
      price, 
      minSize, 
      maxSize, 
      breakfast, 
      pets
    } = this.state;

    let tempRooms = [...rooms];
    if (type !== 'All') {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    capacity = parseInt(capacity);
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    price = parseInt(price);
    tempRooms = tempRooms.filter(room => room.price <= price);

    tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true)
    }

    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true)
    }

    this.setState({
      sortedRooms: tempRooms
    })
  }

  render() {
    return (
      <RoomContext.Provider 
        value={{ 
          ...this.state, 
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}>
        { this.props.children}
      </RoomContext.Provider>
    )
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function consumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomContext, RoomConsumer };