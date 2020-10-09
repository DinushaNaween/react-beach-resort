import React from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
import { withRoomConsumer } from '../Context';
import Loading from './Loading';

function RoomContainer({context}) {
  const {loading, sortedRooms, rooms} = context; 

  if (loading) {
    return <Loading/>
  }
  return (
    <>
      <RoomFilter rooms={rooms}></RoomFilter>
      <RoomList rooms={sortedRooms}></RoomList>
    </>
  )
}

export default withRoomConsumer(RoomContainer);












// import React from 'react';
// import RoomFilter from './RoomFilter';
// import RoomList from './RoomList';
// import { RoomConsumer } from '../Context';
// import Loading from './Loading';

// export default function RoomContainer() {
//   return (
//     <RoomConsumer>
//       {value => {
        
//         const {loading, sortedRooms, rooms} = value; 

//         if (loading) {
//           return <Loading/>
//         }
//         return (
//           <div>
//             Hello from rooms RoomContainer
//             <RoomFilter rooms={rooms}></RoomFilter>
//             <RoomList rooms={sortedRooms}></RoomList>
//           </div>
//         )
//       }}
//     </RoomConsumer>
//   );
// }
