import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button, Checkbox, Textarea, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { EnquiryList } from "./enquiry/EnquiryList";
import { useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default function Enquiry() {
  let [enquiryList, setEnquiryList] = useState([]);
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  let saveEnquiry = (e) => {
    e.preventDefault();
    // let formData={
    //     name:e.target.name.value,
    //     email:e.target.email.value,
    //     phone:e.target.phone.value,
    //     message:e.target.message.value
    // }
    if (formData._id) {
      axios
        .put(`http://localhost:8020/api/website/enquiry/update/${formData._id}`, formData)
        .then((res) => {
          toast.success("Enquiry Updates Successfully");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
          getAllEnquiry();
        });
    } else {
      axios
        .post(`http://localhost:8020/api/website/enquiry/insert`, formData)
        .then((resp) => {
          console.log(resp.data);
          toast.success("Enquiry saved successfully");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
          getAllEnquiry();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to save enquiry. Make sure server is running on port 8020");
        });
    }
  };

  let getAllEnquiry = () => {
    axios
      .get(`http://localhost:8020/api/website/enquiry/view`)
      .then((resp) => resp.data)
      .then((finalData) => {
        {
          if (finalData.status) {
            setEnquiryList(finalData.data);
          }
        }
      });
  };

  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formData };
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  useEffect(() => {
    getAllEnquiry();
  }, []);
  return (
    <div>
      <ToastContainer />
      <h1 className="text-[40px] text-center py-6 font-bold">User Enquiry</h1>

      <div className="grid grid-cols-[30%_auto] gap-11">
        <div className="bg-gray-200 p-4">
          <h2 className="text-[20px] font-bold">Enquiry Form</h2>
          <form action="" onSubmit={saveEnquiry}>
            <div className="py-3">
              <Label htmlFor="name">Your Name</Label>
              <TextInput
                name="name"
                value={formData.name}
                onChange={getValue}
                type="text"
                placeholder="Enter Your Name"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="email">Your Email</Label>
              <TextInput
                name="email"
                type="email"
                value={formData.email}
                onChange={getValue}
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Your Phone</Label>
              <TextInput
                name="phone"
                type="text"
                value={formData.phone}
                onChange={getValue}
                placeholder="Enter Your Phone"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={getValue}
                placeholder="Leave a Message..."
                required
                rows={4}
              />
            </div>
            <div className="py-3">
              <Button type="submit" className="w-full">
                {formData._id ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </div>
        <EnquiryList
          data={enquiryList}
          getAllEnquiry={getAllEnquiry}
          Swal={Swal}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
