import React from "react";
import { Input } from "@/components/ui/input";
function InfoForm() {
  return (
    <div>
      <div className=" pt-4 space-y-1 flex flex-col md:items-left items-center ">
        <Input
          type="email"
          placeholder="E-mail"
          className="text-left w-4/6"
        ></Input>
        <Input
          type="phone number"
          placeholder="Phone Number"
          className="text-left w-4/6"
        ></Input>
        <Input
          type="name"
          placeholder="Name"
          className="text-left w-4/6"
        ></Input>
        <Input id="picture" type="file" className="text-left w-4/6"></Input>
      </div>
      <p className="m-auto">
        Please remember to send your appropriate deposit to
        reginabielu@gmail.com. Thank you!
      </p>
    </div>
  );
}

export default InfoForm;
