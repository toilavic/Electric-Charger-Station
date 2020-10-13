import React from 'react'

export default function ExampleView(props) {
  return (
    <div>
      <h1>This view is example of a protected view</h1>
      <div>
        You should not be able to access this without being logged in
      </div>
      <div>
        <button onClick={ props.loadProtectedData }>Click to load protected content from API</button>        
      </div>
      <div style={{ color: "red" }}>
        Protected content result: <strong>{ props.someData }</strong>
      </div>
      
    </div>
  )
}
