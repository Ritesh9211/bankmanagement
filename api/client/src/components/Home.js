import react from "react";
import icon from "../image/bank.png";

const Home = () => {
  return (
    <div className="home">
      <div className="description">
        <h1>Welcome to Online Banking Application</h1>
        <p>This is an Online Bank Management System with ten Dummy Customers</p>
      </div>
      <div className="img">
        <img height={300} src={icon} alt="icon" />
      </div>
    </div>
  );
};

export default Home;
