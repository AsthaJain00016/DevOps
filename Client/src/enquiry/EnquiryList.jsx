import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import axios from "axios";

import { toast} from "react-toastify";

export function EnquiryList({ data, getAllEnquiry, Swal, setFormData }) {
  let deleteRow = (delid) => {
    Swal.fire({
      title: "Do you want to delete the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`).then(() => {
          toast.success("Enquiry deleted ssuccesfully");
          getAllEnquiry();
        });
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  let editRow = (editid) => {
    axios
      .get(`http://localhost:8020/api/website/enquiry/single/${editid}`)
      .then((res) => {
        let data = res.data;
        setFormData(data.enquiry);
      })
      .catch((err) => {
        toast.error("Error fetching enquiry data");
        console.log(err)
      });
  };

  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-[20px] font-bold">Enquiry List</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>S.No</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Phone</TableHeadCell>
              <TableHeadCell>Message</TableHeadCell>
              <TableHeadCell>
                <span>Edit</span>
              </TableHeadCell>
              <TableHeadCell>
                <span>Delete</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody className="divide-y">
            {data.length >= 1 ? (
              data.map((item, index) => {
                return (
                  <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.message}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => editRow(item._id)}
                        className="bg-blue-500 text-white px-4 py-1 rounded-md"
                      >
                        Edit
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => deleteRow(item._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell colSpan={7} className="text-center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
