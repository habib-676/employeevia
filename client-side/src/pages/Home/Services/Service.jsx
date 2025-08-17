import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

const Service = ({ service }) => {
  const { title, description, image } = service;
  return (
    <Card className="mt-6  p-4 rounded-4xl shadow-2xl text-center hover:scale-90 transition-all duration-200 ">
      <CardBody>
        <div className="flex justify-center">
          <img src={image} className="w-20" />
        </div>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardBody>
    </Card>
  );
};

export default Service;
