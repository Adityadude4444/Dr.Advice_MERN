interface DoctorProps {
  name: string;
  specialization: string;
  image: string;
  onclick: () => void;
}

const Doctortemp = ({ name, specialization, image, onclick }: DoctorProps) => {
  return (
    <div
      className="flex flex-col items-center p-4 cursor-pointer bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
      onClick={onclick}
    >
      <div className="w-24 h-24 overflow-hidden rounded-full mb-4">
        <img
          src={image}
          alt={`${name}`}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="font-semibold text-lg text-center">{name}</h1>
      <h3 className="font-medium text-sm text-gray-600 text-center">
        {specialization}
      </h3>
    </div>
  );
};

export default Doctortemp;
