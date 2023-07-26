import React from 'react'
import MainHeading from '../components/MainHeading'

const RouterLayout = () => {
  return (
    <div>
        <MainHeading />
    </div>
  )
}

export default RouterLayout
// import  { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// interface Data {
//   id: number;
//   name: string;
// }

// const DynamicComponent: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [data, setData] = useState<Data | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`https://api.example.com/data/${id}`);
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   return (
//     <div>
//       {data ? (
//         <div>
//           <h1>Dynamic Component with ID: {id}</h1>
//           <p>Name: {data.name}</p>
//         </div>
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// };

// export default DynamicComponent;

