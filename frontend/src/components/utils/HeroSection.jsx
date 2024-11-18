import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";


const Herosection = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No. 1 Job Website
        </span>
        <h1 className="text-5xl font-bold">
          Search,Apply & <br />
          Get your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p>lorem ipsum dolor sit amet consecuter adisapting elit. Aliqiod aspernatore temporiuym nihil tempra dolor!</p>
        <div className="flex-w-[80%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
            <input 
                type="text"
                placeholder='Find your dream Jobs'
                className="outline-none border-none"
            />
           <Button className="rounded-r-full bg-[#6A38C2]">
            <Search className="h-5 "/>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
