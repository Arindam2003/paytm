import { useNavigate } from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/Subheader"
import axios from "axios"
import { useState } from "react"

const Signin = () => {
  const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="bg-white w-80 rounded-lg text-center p-2 h-max px-4 ">
        <Header label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your accoun"}/>
        <InputBox onChange={e=>setUsername(e.target.value)}
        placeholder="arindam@gmail.com" label={"Email"} />
        <InputBox onChange={e => setPassword(e.target.value)} 
        placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button
            onClick={async () => {
              try {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  { username,password }
                );
                
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              } catch (err) {
                alert(err.response?.data?.message || "Signup failed");
              }
            }}
          label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  )
}

export default Signin