import React, { useState, useEffect} from 'react'


function App() {
  const [data, setData] = useState({})

  useEffect(()=>{
    fetch("/api").then(
      response => response.json()
    ).then(
      data =>{
        setData(data)
      }
    )
  }, [])

  return (
    <div className = "min-h-screen w-full bg-gray-100 flex items-center justify-center flex-col gap-10">
      <h1 className = "text-5xl font-bold text-gray-800">Code Reaction</h1>
      <ul className = "list-none">
        <li className = "rounded-2xl shadow-lg p-5 bg-white">Login</li>
        <br></br>
        <li className = "rounded-2xl shadow-lg p-5 bg-white">User Guide Book</li>
      </ul>

      {(typeof data.users === "undefined")?(
        <p>Loading...</p>
      ):(
        data.users.map((user, i)=>(
          <p key={i}>{user}</p>
        ))
      )
      }
      

    </div>
    
  )
}

export default App
