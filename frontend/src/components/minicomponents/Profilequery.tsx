export const Profilequery = ({
  query,
  specialization,
  name,
}: {
  query: string;
  specialization: string;
  name: string;
}) => {
  return (
    <div className="flex flex-col gap-1 bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out p-4">
      <h3>
        <span className="font-semibold">Name: </span>
        {name}
      </h3>
      <h3>
        <span className="font-semibold">Specialization: </span>
        {specialization}
      </h3>
      <h3>
        <span className="font-semibold">Query: </span>
        {query}
      </h3>
    </div>
  );
};
