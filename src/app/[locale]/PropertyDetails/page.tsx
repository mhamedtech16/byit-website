import Image from "next/image";

import PropertyAvailabilityTypes from "./components/PropertyAvailabilityTypes";

const PropertyDetails = () => {
  return (
    <div className="w-[95%] p-2 mx-auto rounded-xl">
      <div className="relative w-[100%] h-[400px]">
        <Image
          alt="property image"
          src={"/images/intro1.jpg"}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col w-[49%] gap-3">
          <div>
            <p className="font-bold ">205 Towers</p>
            <p className="text-gray-400 ">New Zayed</p>
          </div>

          <div>
            <p className="font-bold ">Starting Price</p>
            <p className="text-gray-400 ">23,000,000</p>
          </div>

          <div>
            <p className="font-bold ">Down Payment</p>
            <p className="text-gray-400 ">10%</p>
          </div>

          <div>
            <p className="font-bold ">Installments</p>
            <p className="text-gray-400 ">6 YEARS</p>
          </div>

          <div>
            <p className="font-bold ">Delivery</p>
            <p className="text-gray-400 ">After three Years</p>
          </div>
        </div>
        <div className="flex flex-col w-[49%] gap-2">
          <Image
            alt="property image"
            src={"/images/intro1.jpg"}
            // layout="responsive"
            className="rounded-xl"
            width={200}
            height={200}
          />
          <div>
            <p className="font-bold ">Type</p>
            <p className="text-gray-400 ">Services Apartment</p>
          </div>

          <div>
            <p className="font-bold ">Finishing</p>
            <p className="text-gray-400 ">Fully Finished</p>
          </div>
        </div>
      </div>

      {/* <SalesContact /> */}

      <PropertyAvailabilityTypes />
    </div>
  );
};

export default PropertyDetails;
