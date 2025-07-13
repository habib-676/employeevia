import React, { use } from "react";
import Container from "../../../components/Shared/Container/Container";
import Testimonial from "./Testimonial";
import HoverUnderlineText from "../../../components/Shared/Animation/HoverUnderlineText";

const Testimonials = ({ testimonialPromise }) => {
  const testimonials = use(testimonialPromise);
  return (
    <Container>
      <div className="mt-20">
        <h3 className="font-bold text-4xl text-center">
          <HoverUnderlineText>What People Say</HoverUnderlineText>
        </h3>
        <p className="text-center font-medium text-secondary-content mt-6">
          We care about your opinion
        </p>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((test) => (
            <Testimonial key={test.id} test={test}></Testimonial>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Testimonials;
