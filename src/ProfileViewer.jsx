import { useState, useEffect } from "react";
const GITHUB_URL="https://api.github.com/users"
import axios from "axios";
export default function ProfileViewer() {
    const [user, setUser] = useState({ login: "", avatar_url: "" });
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    async function findProfile(evt){
        evt.preventDefault()
        try {
            const data= await axios.get(`${GITHUB_URL}/${username}`)
            setUser((currData)=>{
                return{...currData, login:data.data.login, avatar_url:data.data.avatar_url}
            })
            
        } catch (error) {
            setError("User not found!")
        }
   
    }

    function handleInputChange(evt){
          setUsername(evt.target.value)
    }



  return (
    <form onSubmit={findProfile}>
      <label htmlFor="username">Enter github username</label>
      <div>
        <input type="text" name="username" id="username" value={username} onChange={handleInputChange}  />
        <button>Search</button>
      </div>
        
      <div>
        <h3> {user.login} </h3>
      </div>
      <img src={user.avatar_url} alt="" />
        {error && <p style={{color:"red", fontWeight:"bold"}}>{error}</p>}
    </form>
  );
}
