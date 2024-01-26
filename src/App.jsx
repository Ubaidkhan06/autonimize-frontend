import { useEffect, useMemo, useState } from "react";
import "./App.css";
import axios from "axios";

// const url = process.env.REACT_PUBLIC_BACKEND_URL;
function App() {
  const [loading, setLoading] = useState(false);

  const [inputData, setInputData] = useState("");
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);

  const [allUsers, setAllUsers] = useState(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8081/api/user/${inputData}`
      );
      setLoading(false);
      console.log(res.data);
      setUserData(res.data.data.avatar);
      setData(res.data.data.repos);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:8081/api/allusers`);
  //       setAllUsers(res?.data?.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  return (
    <main className="p-6">
      <h1 className="text-center text-3xl font-semibold">
        Github Repositories
      </h1>

      <section>
        <div className="flex justify-center gap-2 w-full mt-10">
          <input
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            type="text"
            className="border-blue-400 border rounded-md pl-2"
          />
          <button
            className="bg-blue-600 rounded-md p-2 hover:bg-blue-600/90 text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </section>

      <section>
        {loading ? (
          <p>Loading...</p>
        ) : (
          data?.map((ele, idx) => (
            <div key={idx}>
              <h1>{ele.name}</h1>
              <h2>{ele.fullname}</h2>
              <span>{ele.watchers}</span>
              <span>{ele.forks}</span>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default App;
