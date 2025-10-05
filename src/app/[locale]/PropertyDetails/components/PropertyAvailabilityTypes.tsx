import { AvailabilityPopoverButton } from "./AvailabilityPopoverButton";

const PropertyAvailabilityTypes = () => {
  return (
    <div className="flex flex-row px-[10%] justify-between border-t-1 border-t-gray-300 py-[2vmin]">
      <div>
        <AvailabilityPopoverButton className="w-[10vmin] h-[10vmin] rounded-[5vmin] hover:bg-primary/5 cursor-pointer shadow-md">
          <i className="fa-solid fa-city text-primary text-5xl"></i>
        </AvailabilityPopoverButton>
        <p className="text-center font-bold mt-2">Apartment</p>
      </div>

      <div>
        <AvailabilityPopoverButton className="w-[10vmin] h-[10vmin] rounded-[5vmin] hover:bg-primary/5 cursor-pointer shadow-md">
          <i className="fa-solid fa-house-chimney text-primary text-5xl"></i>
        </AvailabilityPopoverButton>
        <p className="text-center font-bold mt-2">Villa</p>
      </div>

      <div>
        <AvailabilityPopoverButton className="w-[10vmin] h-[10vmin] rounded-[5vmin] hover:bg-primary/5 cursor-pointer shadow-md">
          <i className="fa-solid fa-hotel text-primary text-5xl"></i>
        </AvailabilityPopoverButton>
        <p className="text-center font-bold mt-2">Commercial</p>
      </div>
    </div>
  );
};

export default PropertyAvailabilityTypes;
