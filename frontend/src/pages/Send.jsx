import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const SendMoney = () => {
  const [amount, setAmount] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const toUsername = searchParams.get("username");
  const name = searchParams.get("name");

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">

          <h2 className="text-3xl font-bold text-center">Send Money</h2>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-2xl text-white">
                {name?.[0]?.toUpperCase()}
              </span>
            </div>
            <h3 className="text-2xl font-semibold">{name}</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="text-sm font-medium">
                Amount (in Rs)
              </label>
              <input
                id="amount"
                type="number"
                className="w-full h-10 rounded-md border px-3"
                placeholder="Enter amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>

            <button
              className="w-full bg-green-500 text-white h-10 rounded-md"
              onClick={async () => {
                try {
                  const token = localStorage.getItem("token");

                  await axios.post(
                    "http://localhost:3000/api/v1/accounts/transfer",
                    {
                      toUsername,
                      amount: Number(amount)
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`
                      }
                    }
                  );

                  alert("Transfer successful");
                  navigate("/dashboard");
                } catch (err) {
                  alert(err.response?.data?.message || "Transfer failed");
                }
              }}
            >
              Initiate Transfer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SendMoney;
