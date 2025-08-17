import { FaUsers, FaClock, FaMoneyCheckAlt, FaBuilding } from "react-icons/fa";
import CountUp from "react-countup";
import Container from "../../../components/Shared/Container/Container";
import HoverUnderlineText from "../../../components/Shared/Animation/HoverUnderlineText";
import { useInView } from "react-intersection-observer";

const Stats = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const stats = [
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      label: "Employees Managed",
      value: 124,
    },
    {
      icon: <FaClock className="text-4xl text-accent" />,
      label: "Hours Tracked",
      value: 4300,
    },
    {
      icon: <FaMoneyCheckAlt className="text-4xl text-success" />,
      label: "Payments Processed",
      value: 132,
    },
    {
      icon: <FaBuilding className="text-4xl text-warning" />,
      label: "Companies Using",
      value: 12,
    },
  ];

  return (
    <Container>
      <section className="mt-20 " ref={ref}>
        <div className=" px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold  mb-10">
            <HoverUnderlineText>Our Impact So Far</HoverUnderlineText>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-base-100 shadow-md p-6 rounded-xl transition-transform hover:scale-105 duration-300 border border-primary"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-secondary">
                  {inView ? <CountUp end={stat.value} duration={2} /> : 0}
                </h3>
                <p className="mt-2 text-base-content">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Stats;
