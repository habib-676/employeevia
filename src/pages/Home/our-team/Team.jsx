import React, { use } from "react";
import Container from "../../../components/Shared/Container/Container";
import Person from "./Person";
import HoverUnderlineText from "../../../components/Shared/Animation/HoverUnderlineText";

const Team = ({ teamPromise }) => {
  const teamData = use(teamPromise);
  return (
    <Container>
      <div className="mt-24">
        <h2 className="text-center text-4xl font-bold">
          <HoverUnderlineText>Meet Our Team</HoverUnderlineText>
        </h2>
        <p className="text-center font-medium text-secondary-content mt-6">
          Real people behind the scenes
        </p>
        <div className="card-body card shadow-2xl bg-base-200 border border-primary mt-10 min-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-10">
            {teamData.map((person) => (
              <Person key={person.id} person={person}></Person>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Team;
