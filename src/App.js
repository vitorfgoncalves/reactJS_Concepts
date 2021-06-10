import React, {useState,useEffect} from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRepositories(response.data)
    })
  },[repositories])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      url,
      title,
      techs
    })
    const repository = response.data;

    setRepositories([...repositories,repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)

    const repository = response.data;

    setRepositories([...repositories,repository])
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map( repository =>{
            return (<li key={repository.title}>{repository.title}<button onClick={() => handleRemoveRepository(repository.id)}> Remover </button></li>)
          })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
