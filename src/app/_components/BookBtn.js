import React, { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@uidotdev/usehooks";
import { toast } from "sonner";
import moment from "moment";
import { Textarea } from "@/components/ui/textarea";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CalendarDays, Clock } from "lucide-react";
import GlobalAPI from "../utils/GlobalAPI";
import { set } from "date-fns";

function BookBtn({ item }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState({});
  // Form Input Handling
  const [formFirstName, setFormFirstName] = useState("");
  const [formLastName, setFormLastName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formImage, setFormImage] = useState("");

  const handleSubmit = (event) => {
    // Creating the appointment object to send to the database. Each Item must match the designated name given on Strapi
    event.preventDefault();
    const data = {
      data: {
        style: item.id,
        Date: selectedDate.strapiDay,
        Time: selectedTimeSlot,
        Name: formFirstName + " " + formLastName,
        email: formEmail,
        Phone: formPhone,
      },
    };

    GlobalAPI.createAppointment(data).then((resp) => {
      if (resp) {
        GlobalAPI.sendEmail(data).then((resp) => {
          console.log(resp);
        });
        console.log(parseInt(selectedTimeSlot));
        const newTimesCopy = selectedDate.timeSlots.filter(
          (n) =>
            n < parseInt(selectedTimeSlot) ||
            n >= parseInt(selectedTimeSlot) + item.attributes.Duration / 60
        );
        const updateData = {
          data: {
            Slots: newTimesCopy,
          },
        };
        console.log(newTimesCopy);
        GlobalAPI.updateAvailability(updateData, selectedDate.id).then(
          (resp) => {
            console.log(resp);
          }
        );
        console.log(selectedDate.timeSlots.length);
        if (selectedDate.timeSlots.length === 1) {
          GlobalAPI.deleteAvailability(selectedDate.id).then((resp) => {
            console.log(resp);
          });
        }
        toast(
          "Appointment Booked! You will receive a email confirmation soon.",
          {
            description:
              "Please send yor deposit to reginabielu@gmail.com and arrive on time!",
          }
        );
      }
      setSelectedDate({});
      setSelectedTimeSlot();
      setTimeout(function () {
        location.reload(true);
      }, 3000);
    });
  };
  const getAvailability = () => {
    // availabilities API call
    GlobalAPI.getAvailability().then((resp) => {
      console.log(resp.data.data);
      setDates(resp.data.data);
    });
  };
  const handleDateChange = (date) => {
    // this function is taking the date that has been selected, and comparing that to our list of availabilities as set my the owner.
    // Once a matching date is found, we set that date to be the selected date, and use that to update the time slots available.
    if (date === undefined) {
      setSelectedDate({});
    } else {
      const chosen = availableDates.find(
        (d) =>
          d.jsDay.getDate() === date.getDate() &&
          d.jsDay.getMonth() === date.getMonth()
      );
      setSelectedDate(chosen);
      setSelectedTimeSlot();
    }
  };

  const availableDates = dates?.map((date) => {
    // taking each strapi value and using moment.js to account for the timezone change and localize, and making the time slots populate
    return {
      id: date.id,
      strapiDay: moment(date.attributes.Day),
      jsDay: moment(date.attributes.Day).toDate(),
      timeSlots: date.attributes.Slots.toSorted(),
    };
  });
  const isAvail = (day) => {
    // This function is needed to let the react day picker interact with the moment.js fate fields for comparison of which dates to not disable.
    return !availableDates.some((chosenDay) => {
      return (
        chosenDay.jsDay.getDate() === day.getDate() &&
        chosenDay.jsDay.getMonth() === day.getMonth() &&
        chosenDay.jsDay.getFullYear() === day.getFullYear()
      );
    });
  };

  useEffect(() => {
    getAvailability();
  }, []);

  const pastDate = (date) => {
    return date <= new Date();
  };

  if (!isDesktop) {
    return (
      <Dialog>
        <DialogTrigger>
          <Button>Book</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Book Your {item.attributes.Style} Appointment!
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-col justify-center space-y-1 ">
                {/* Calender */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">
                      <h2 className="flex gap-2 items-center">
                        <CalendarDays className="text-secondary h-5 w-5" />
                        Select Day
                      </h2>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate.jsDay}
                      onSelect={handleDateChange}
                      disabled={[
                        pastDate,
                        isAvail,
                        { dayOfWeek: item.attributes.Availability },
                      ]}
                      className="rounded-md border"
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* Time Select */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">
                      <h2 className="flex gap-2 items-center text-center">
                        <Clock className="text-secondary h-5 w-5"></Clock>
                        Select Time
                      </h2>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {selectedDate.timeSlots ? (
                      <div className=" grid grid-cols-2 gap-2 border rounded-md p-3">
                        {selectedDate.timeSlots?.map((time, index) => {
                          return (
                            <>
                              <h2
                                onClick={() => setSelectedTimeSlot(time)}
                                className={`p-2 border rounded-full hover:bg-secondary hover:text-white 
                          hover:cursor-pointer hover transition-all duration-300 ${
                            time === selectedTimeSlot
                              ? "bg-secondary text-white"
                              : ""
                          }`}
                                key={index}
                              >
                                {time <= 12
                                  ? `${time}:00 AM`
                                  : `${time % 12}:00 PM`}
                              </h2>
                            </>
                          );
                        })}
                      </div>
                    ) : (
                      <div>Please Select a Date</div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            {/* Information Form */}
            <form onSubmit={handleSubmit}>
              <div className=" pt-4 space-y-1 flex flex-col md:items-left items-center ">
                <Input
                  type="email"
                  placeholder="E-mail"
                  className="text-left w-4/6"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                ></Input>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="text-left w-4/6"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                ></Input>
                <Input
                  type="text"
                  placeholder="First Name"
                  className="text-left w-4/6"
                  value={formFirstName}
                  onChange={(e) => setFormFirstName(e.target.value)}
                ></Input>
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="text-left w-4/6"
                  value={formLastName}
                  onChange={(e) => setFormLastName(e.target.value)}
                ></Input>
                <Textarea
                  id="notes"
                  placeholder="Notes for your stylist"
                  className="text-left w-4/6 h-2/6"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                ></Textarea>
              </div>
              <p className="m-auto">
                Please remember to send your appropriate deposit to
                reginabielu@gmail.com. Thank you!
              </p>
              <button type="submit">
                <DialogClose asChild>
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={
                      !(
                        selectedDate &&
                        selectedTimeSlot &&
                        formFirstName &&
                        formLastName &&
                        formPhone &&
                        formEmail
                      )
                    }
                  >
                    Book
                  </Button>
                </DialogClose>
              </button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Desktop View
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Book</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Book Your {item.attributes.Style} Appointment!
          </DialogTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
            {/* Calendar */}
            <div className="flex flex-col gap-3 items-baseline">
              <h2 className="flex gap-2 items-center">
                <CalendarDays className="text-secondary h-5 w-5" />
                Select Day
              </h2>
              <Calendar
                mode="single"
                selected={selectedDate.jsDay}
                onSelect={handleDateChange}
                disabled={[
                  pastDate,
                  isAvail,
                  { dayOfWeek: item.attributes.Availability },
                ]}
                className="rounded-md border"
              />
            </div>
            {/* Time slot */}
            <div className="mt-3 md:mt-0">
              <h2 className="flex gap-2 items-center text-center mb-3">
                <Clock className="text-secondary h-5 w-5"></Clock>
                Select Time
              </h2>
              {selectedDate.timeSlots ? (
                <div className=" grid grid-cols-2 gap-2 border rounded-md p-3">
                  {selectedDate.timeSlots?.map((time, index) => {
                    return (
                      <>
                        <h2
                          onClick={() => setSelectedTimeSlot(time)}
                          className={`p-2 border rounded-full hover:bg-secondary hover:text-white 
                          hover:cursor-pointer hover transition-all duration-300 ${
                            time === selectedTimeSlot
                              ? "bg-secondary text-white"
                              : ""
                          }`}
                          key={index}
                        >
                          {time <= 12 ? `${time}:00 AM` : `${time % 12}:00 PM`}{" "}
                        </h2>
                      </>
                    );
                  })}
                </div>
              ) : (
                <div>Please Select a Date</div>
              )}
            </div>
          </div>
        </DialogHeader>
        {/* Submit Form */}
        <DialogFooter className="sm:justify-start">
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row space-x-1">
                <div className="space-y-1 flex flex-col items-left w-full ">
                  <Input
                    type="text"
                    placeholder="First Name"
                    className="text-left w-full"
                    value={formFirstName}
                    onChange={(e) => setFormFirstName(e.target.value)}
                  ></Input>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    className="text-left w-full"
                    value={formLastName}
                    onChange={(e) => setFormLastName(e.target.value)}
                  ></Input>
                  <Input
                    type="email"
                    placeholder="E-mail"
                    className="text-left w-full"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  ></Input>
                </div>
                <div className="space-y-1 flex flex-col md:items-left items-left w-full ">
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    className="text-left w-full"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                  ></Input>
                  <Textarea
                    id="notes"
                    placeholder="Notes for your stylist (optional)"
                    className="text-left w-full h-3/6"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                  ></Textarea>
                </div>
              </div>
              <p className="m-auto">
                Please remember to send your appropriate deposit to
                reginabielu@gmail.com. Thank you!
              </p>
              <button type="submit">
                <DialogClose asChild>
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={
                      !(
                        selectedDate &&
                        selectedTimeSlot &&
                        formFirstName &&
                        formLastName &&
                        formPhone &&
                        formEmail
                      )
                    }
                  >
                    Book
                  </Button>
                </DialogClose>
              </button>
            </form>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookBtn;
