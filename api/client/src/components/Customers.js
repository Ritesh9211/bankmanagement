import react, { useState, useEffect } from "react";
import { axiosInstance } from "../config";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axiosInstance.get("/getcustomers");
      // console.log("res: ", res);
      // console.log("res: ", res.status);
      setCustomers(res.data);
    };

    getData();
  }, []);

  return (
    <div className="Customers">
      <div className="container">
        <h1>List of all customers</h1>
        <table>
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Account Balance</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.c_id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
