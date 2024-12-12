import { useState } from "react";
import { interactionprops2 } from "../../pages/Doctor";

const Doctorchat = ({
  query,
  response,
  interactionDate,
}: interactionprops2) => {
  const [isResponseExpanded, setIsResponseExpanded] = useState(false);

  const toggleResponseExpansion = () => {
    setIsResponseExpanded(!isResponseExpanded);
  };

  return (
    <div className="flex flex-col gap-1 bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out p-4">
      <h3>
        <span className="font-semibold">Query: </span>
        {query}
      </h3>
      <h3>
        <span className="font-semibold">Response: </span>
        {isResponseExpanded
          ? response
          : response.length > 150
          ? `${response.substring(0, 150)}...`
          : response}
        {response.length > 150 && (
          <button
            onClick={toggleResponseExpansion}
            className="text-blue-500 underline ml-2"
          >
            {isResponseExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </h3>
      <h3>
        <span className="font-semibold">Date: </span>
        {interactionDate.substring(0, 11)}
      </h3>
    </div>
  );
};

export default Doctorchat;
