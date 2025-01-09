import { useEffect, useState } from "react";

type Program = {
  id: number;
  title: string;
};

function ProgramIndex() {
  const [programs, setPrograms] = useState([] as Program[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((response) => response.json())
      .then((data: Program[]) => {
        setPrograms(data);
      });
  }, []);

  return (
    <ul>
      {programs.map((program) => (
        <li key={program.id}>{program.title}</li>
      ))}
    </ul>
  );
}

export default ProgramIndex;
