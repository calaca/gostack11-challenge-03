import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRepositories() {
      const response = await api.get("repositories");

      setRepositories(response.data);
    }

    fetchRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      url: "https://github.com/teste/teste",
      title: "Teste",
      techs: ["Node", "AdonisJS", "TypeScript"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const filteredRepositories = repositories.filter(
        (repository) => repository.id !== id
      );
      setRepositories(filteredRepositories);
    } else {
      setError(response.data.error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
