import { useState, useEffect } from "react";

const usePending = () => {
  const fetchOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "x-access-token": sessionStorage.getItem("x-auth-token")
    }
  };
  const [pending, setPending] = useState([]);

  useEffect(() => {
    async function getPending() {
      try {
        const response = await fetch("http://localhost:5000/api/pending", fetchOptions);
        const res = await response.json();
        if (response.status !== 200) throw new Error(res);
        setPending(res);
      } catch (err) {
        alert(err);
      }
    }
    getPending();
  }, []);

  return [pending, setPending];
};

export default usePending;
