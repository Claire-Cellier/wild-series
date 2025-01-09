import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProgramDeleteForm from "../components/ProgramDeleteForm";
import "./programs.css";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

function ProgramDetails() {
  const { id } = useParams();
  const [program, setProgram] = useState(null as null | Program);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  return (
    program && (
      <>
        <hgroup className="details-hgroup">
          <h1>{program.title}</h1>
          <Link to={`/programs/${program.id}/edit`}>Modifier</Link>
          <ProgramDeleteForm id={program.id}>Supprimer</ProgramDeleteForm>
        </hgroup>
        <ul>
          <li>{program.synopsis}</li>
          <li>
            <img src={program.poster} alt={program.title} />
          </li>
          <li>{program.country}</li>
          <li>{program.year}</li>
          <li>{program.category_id}</li>
        </ul>
      </>
    )
  );
}

export default ProgramDetails;
