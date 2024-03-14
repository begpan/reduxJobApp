import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddJob from "./pages/AddJob";
import JobList from "./pages/JobList";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setLoading, setError, setJobs } from "./redux/slices/jobSlice";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  // api iseği atıp cevabı store a bildirir
  const getJobs = () => {
    // sliceteki yukleniyoru true ya cek
    dispatch(setLoading());

    // api istegi at

    axios
      .get("http://localhost:3001/jobs")
      //   slicedeki veriyi guncelle
      .then((res) => dispatch(setJobs(res.data)))
      //   slicedaki erroru guncelle
      .catch((err) => dispatch(setError(err.message)));
  };

  useEffect(() => {
    getJobs();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<JobList getJobs={getJobs} />} />
        <Route path="/add" element={<AddJob />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
