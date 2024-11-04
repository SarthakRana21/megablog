import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else {
        dispatch(logout())
      }
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <Router>
      {!loading ? <div className="min-h-screen flex flex-wrap content-between bg-gray-700">
        <div className=" min-h-screen w-full flex justify-between items-center flex-col">
          <Header />
          TODO:
          {/* <outlet /> */}
          <Footer />
        </div>
        </div> : <div>Loading</div>}
    </Router>
  );
}

export default App;
