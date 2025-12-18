import { Route, Routes } from "react-router"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Send from "./pages/Send"
import NotFound from "./pages/NotFound"


function App() {
  return (
    <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
