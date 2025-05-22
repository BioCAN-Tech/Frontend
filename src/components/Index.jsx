import React, { use, useEffect, useState } from 'react'
import axios from 'axios';

export default function Index() {

    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            setData(response.data)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    })
  return (
    <div>
    <ul>
        {data.map((item) => (
            <li key={item.id}>
            {item.id}
                <h2>{item.title}</h2>
                <p>{item.body}</p>
            </li>
        ))}
    </ul>
    </div>
  )
}
