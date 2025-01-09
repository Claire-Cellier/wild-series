import { useEffect, useState } from "react";

import "./programs.css";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

function Programs() {
  const [programs, setPrograms] = useState<Program[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3310/api/programs/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Program[]) => setPrograms(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (programs === null) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="program">
      {programs.map((program) => (
        <div className="serie" key={program.id}>
          <img src={program.poster} alt={program.title} />
          <div className="text">
            <h1>{program.title}</h1>
            <p>{program.synopsis}</p>
            <h6>{program.country}</h6>
            <h6>{program.year}</h6>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Programs;
