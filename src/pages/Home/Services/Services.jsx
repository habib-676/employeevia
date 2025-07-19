import { use } from "react";
import Service from "./Service";
import Container from "../../../components/Shared/Container/Container";
import HoverUnderlineText from "../../../components/Shared/Animation/HoverUnderlineText";

const Services = ({ servicesPromise }) => {
  const services = use(servicesPromise);
  console.log(services);
  return (
    <Container>
      <div className="mt-20">
        <h2 className="font-bold text-3xl md:text-4xl text-center ">
          <HoverUnderlineText>What We Offer</HoverUnderlineText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-5">
          {services.map((service) => (
            <Service key={service.id} service={service}></Service>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Services;
