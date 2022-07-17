import { axiosInstance } from "../config";
import react, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";

const Transact = () => {
  const [customers, setCustomers] = useState([]);
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState(-1);
  const [sender_bal, setSenderBal] = useState();

  let history = useHistory();

  var sender_id, receiver_id;

  const getCustomers = async () => {
    try {
      const res = await axiosInstance.get("/getcustomers");
      console.log(res.data);
      setCustomers(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const transactionHandler = async (e) => {
    e.preventDefault();

    try {
      console.log("sender Receiver Amount", sender, receiver, amount);
      if (sender === "") {
        window.alert("Select sender!");
        return;
      } else if (receiver === "") {
        window.alert("Select Receiver");
        return;
      } else if (amount === -1) {
        window.alert("Please enter amount to be transferred!");
        return;
      } else if (sender_bal < amount) {
        window.alert("Insufficient Funds!!");
        return;
      } else if (sender === receiver) {
        window.alert("Sender and Receiver Cannot be the same!!");
        return;
      }
      // const body = { sender, receiver, amount };

      // const response = await fetch("/transfer", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(body),
      // });
      console.log(sender);
      console.log(receiver);
      console.log(amount);
      const res = await axiosInstance.post("/transfer", {
        sender,
        receiver,
        amount,
      });

      console.log("response", res);
      window.confirm("Transaction Successful!");
      getCustomers();

      history.push("/history");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const senderChangeHandler = (e) => {
    sender_id = e.target.value;
    customers.forEach((customer) => {
      // console.log(customer.c_id == sender_id);
      if (customer.c_id == sender_id) {
        // console.log("works fine");
        setSender(customer.name);
        setSenderBal(customer.balance);
      }
    });
  };
  // console.log("SenderName", sender);
  // console.log("Balance", sender_bal);

  const receiverChangeHandler = (e) => {
    receiver_id = e.target.value;
    customers.forEach((customer) => {
      if (customer.c_id == receiver_id) {
        setReceiver(customer.name);
      }
    });
  };
  // console.log(receiver);

  const amountChangeHandler = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className="Transact">
      <div className="container transfer">
        <span className="title">Transfer Form</span>
        <br />
        <br />
        <form onSubmit={transactionHandler}>
          <div>
            Sender: <br />
            <select name="sender" id="sender" onChange={senderChangeHandler}>
              <option value="DEFAULT" selected disabled>
                Choose Sender
              </option>
              {customers.map((sender) => (
                <option key={sender._id} value={sender.c_id}>
                  {sender.name} [Balance Rs.{sender.balance}]
                </option>
              ))}
            </select>
          </div>
          <br />
          <div>
            Receiver: <br />
            <select
              name="receiver"
              id="receiver"
              onChange={receiverChangeHandler}
            >
              <option value="DEFAULT" selected disabled>
                Choose Receiver
              </option>
              {customers.map((receiver) => (
                <option key={receiver._id} value={receiver.c_id}>
                  {receiver.name} [Rs.{receiver.balance}]
                </option>
              ))}
            </select>
          </div>
          <br />
          <div>
            Amount: <br />
            <input
              type="text"
              placeholder="Rs."
              onChange={amountChangeHandler}
            />
          </div>
          <div className="transfer-btn">
            <button type="submit">Transfer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Transact;
