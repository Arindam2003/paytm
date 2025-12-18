import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

const Dashboard = () => {
  const [balance,setBalance]= useState(null);
  const [user,setUser]=useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:3000/api/v1/accounts/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setBalance(response.data.balance);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:3000/api/v1/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUser(response.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();

    fetchBalance();
  }, []);

  return (
    <div>
      <Appbar user={user} />
      <div className="m-8">
        <Balance value={balance ?? "Loading..."} />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard

// localhost: 3000 / api / v1 / accounts / transfer