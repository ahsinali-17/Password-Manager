import React, { useState, useRef, useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Manager = () => {
  let hide = useRef();
  let pass = useRef();
  let del = useRef();
  let copy = useRef();

  const [form, setform] = useState({ url: "", username: "", password: "" });
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    let oldPass = localStorage.getItem("password");
    if (oldPass) {
      setPasswords(JSON.parse(oldPass));
    }
  }, []);

  const showPass = () => {
    if (pass.current.type === "password") {
      hide.current.src = "hide.svg";
      pass.current.type = "text";
    } else {
      hide.current.src = "show.svg";
      pass.current.type = "password";
    }
  };

  const savePass = () => {

    if(form.url ==="" || form.username === "" || form.password === ""){
      toast('Invalid Input!!!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }
    else if (passwords.length === 0) {
      setPasswords(form)
      localStorage.setItem("password", JSON.stringify(form));
      setform({ url: "", username: "", password: "" });
    }

    else if (passwords.filter(
        (i) => i.url === form.url && i.password === form.password
      ).length !== 0) {
        toast('Password already exist!!!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce
          });
      setform({ url: "", username: "", password: "" });
    }
    
    else{
    setPasswords([...passwords, form]);
    localStorage.setItem("password", JSON.stringify([...passwords, form]));
    setform({ url: "", username: "", password: "" });
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const deletePass = (pass) => {
    let newPass = passwords.filter((i) => i !== pass);
    localStorage.setItem("password", JSON.stringify(newPass));
    setPasswords(newPass);
  };

  const copyPass = (pass) => {
    navigator.clipboard.writeText(pass);

    toast.success('Copied to Clipboard...', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce
      });
  };

  const editPass = (pass) => {
    setform(pass);
    let newPass = passwords.filter((i) => i !== pass);
    localStorage.setItem("password", JSON.stringify(newPass));
    setPasswords(newPass);
  };
  return (
    <div className="container h-[88vh] overflow-scroll overflow-x-hidden">

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />
      
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>

      <h3 className="text-center font-bold text-red-500 italic mt-12">
        <div className="logo text-4xl text-black italic">
          <span className="text-red-500">&lt;</span>
          Pass
          <span className="text-red-500">Manager/</span>
          <span className="text-red-500">&gt;</span>
        </div>
      </h3>
      <p className="text-center font-semibold text-red-700 text-2xl mt-3">
        Your own password Manager...
      </p>

      <div className="inputs flex flex-col p-4 gap-6 mx-auto max-w-2xl m-3">
        <input
          className="rounded-lg bg-black text-white px-2 py-1"
          onChange={handleChange}
          value={form.url}
          type="text"
          name="url"
          id=""
          placeholder="website's URL"
          required={true}
        />
        <div className="flex gap-6 justify-center min-w-full">
          <input
            className="rounded-lg bg-black text-white px-2 py-1 w-2/3"
            onChange={handleChange}
            value={form.username}
            type="text"
            name="username"
            placeholder="Username"
            required={true}
          />
          <div className="flex relative w-1/3 items-center">
            <input
              className="rounded-lg bg-black text-white px-2 py-1 w-full"
              onChange={handleChange}
              value={form.password}
              ref={pass}
              type="password"
              name="password"
              placeholder="password"
              required={true}
            />
            <button
              className="absolute right-0 text-white px-2"
              onClick={showPass}
            >
              <img src="show.svg" alt="show" ref={hide} />
            </button>
          </div>
        </div>
        <div className="add flex justify-end gap-3">
          <button
            onClick={savePass}
            className="border-2 border-black p-4 rounded-full text-red-500 flex items-center hover:border-red-500 hover:text-black max-w-24 max-h-10"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              style={{ width: "50px", height: "25px" }}
            ></lord-icon>
            <span className="font-semibold">Save</span>
          </button>
        </div>
      </div>

      <div className="savedPasswords flex flex-col items-center mb-0">
        <h1 className="text-2xl font-bold text-red-500 py-4">Your Passwords</h1>
        {passwords.length === 0 ? (
          <div>No saved passwords to display...</div>
        ) : (
          <table className="table-fixed border-2 border-black w-[90vw] rounded-xl overflow-hidden">
            <thead className="bg-black text-red-500">
              <tr>
                <th>URL</th>
                <th>USERNAME</th>
                <th>PASSWORDS</th>
                <th>OPTIONS</th>
              </tr>
            </thead>
            <tbody>
              {passwords.map((i, index) => {
                return (
                  <tr key={index} className="z-10">
                    <td className="text-center">
                      <a href={i.url} target="_blank" ref={del}>
                        {i.url}
                      </a>
                    </td>
                    <td className="">
                      <div className="flex items-center justify-center">
                        {i.username}
                        <button
                          onClick={() => {
                            copyPass(i.username);
                          }}
                          className="mx-3"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xpgofwru.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </button>
                      </div>
                    </td>
                    <td className="" ref={copy}>
                      <div className="flex items-center justify-center">
                        {i.password}
                        <button
                          onClick={() => {
                            copyPass(i.password);
                          }}
                          className="mx-3"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xpgofwru.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </button>
                      </div>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          deletePass(i);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </button>
                      <button
                        onClick={() => {
                          editPass(i);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/wkvacbiw.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Manager;
