// import { useState } from "react"

// const [username, setUsername] = useState("");
// const [password, setPassword] = useState("");
// const [error, setError] = useState(null);

// export default function SignUpForm() {
//     async function handleSubmit(event) {
//         event.preventDefault();
//         console.log("Hello 👋");
//     }
//     return <h2>Sign Up!</h2>;
//     <form onSubmit={handleSubmit}>
//         <label for="username">
//             Username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
//         </label>
//         <label for="password">
//             Password: <input value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <button type="submit" value="Submit">Submit</button>
//     </form>
// }

import { useState } from "react";

export default function SignUpForm({setToken}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
        const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', 
        { 
          method: "POST", 
          headers: { 
            "Content-Type": "application/json" 
          }, 
          body: JSON.stringify({ 
            username: `${username}`, 
            password: `${password}` 
          }) 
        })
        const result = await response.json();
        setToken(result.token);
        console.log(result);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username} onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}