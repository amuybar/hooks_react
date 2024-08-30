import React, { useState, useEffect } from 'react';


export default function App() {
  const [resourceType, setResourceType] = useState('posts');
  const [data, setData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    return () => window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
  }, []);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then((response) => response.json())
      .then((json) => setData(json));
  },[resourceType])
  return (
    <>
      <h1>Window width is: { windowWidth}</h1>
      <div>
        <button onClick={()=>setResourceType('posts')}>Posts</button>
        <button onClick={() => setResourceType('users')}>users</button>
        <button onClick={()=>setResourceType('comments')}>comments</button>
      </div>
      {
        data.length > 0 &&
        <ul>
          {data.map((item) => (
            <pre >{ JSON.stringify(item)}</pre>
          ))}
        </ul>
      }
    </>
  )
}