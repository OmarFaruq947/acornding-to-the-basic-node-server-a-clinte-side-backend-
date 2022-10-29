import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
// add user
const handleAddUser=(e)=>{
  e.preventDefault()
  
  const name = e.target.name.value;
  const email = e.target.email.value;
  const phone = e.target.phone.value;
  
  //object create
  const user = {name,email,phone}

  // post data to server
  fetch('http://localhost:5000/user', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data => {
    const newUsers = [...users, data];
    setUsers(newUsers);
    console.log(data)
  });
}


  return (
    <div className="App">
      <h1>my own data</h1>
      <h3>total data: {users.length}</h3>

      <form onSubmit={handleAddUser}>
        <input type="text" placeholder="name" name="name" required/>
        <input type="text" placeholder="email" name="email" required/>
        <input type="text" placeholder="phone" name="phone" required/>
        <input type="submit" value="Add User"/>
      </form>

      <hr />
      {users.map((user) => (
        <p key={user.id}>
          {user.name} & {user.email}
        </p>
      ))}
    </div>
  );
}

export default App;
