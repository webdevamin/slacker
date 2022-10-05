import Head from 'next/head'
import { useState } from 'react';
import axios from "axios";

const initForm = {
  name: ``,
  password: ``
}

const Home = () => {
  const [form, setForm] = useState(initForm);
  const [error, setError] = useState(``);
  const [afterSubmit, setAfterSubmit] = useState(``);

  const reset = () => {
    setForm(initForm);
    setError(``);
    setAfterSubmit(``);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/api/send`, form);

      setAfterSubmit(`Yes`);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
      else {
        setError(`Something went wrong with the servers. Please try again later.`);
      }
    }
    reset();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  }


  return (
    <>
      <Head>
        <title>Slacker Form</title>
        <meta name="description" content="Slacker Form" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`px-10 md:px-10 container mx-auto flex flex-col 
      h-screen justify-center items-center`}>
        <h1 className={`text-2xl font-bold mb-7`}>
          Slacker Form
        </h1>
        <form onSubmit={handleSubmit}
          className={`w-full sm:w-10/12 max-w-lg flex flex-col gap-2`}>
          {
            afterSubmit && (
              <div className={`text-white bg-emerald-600 w-full p-3 rounded 
              font-semibold text-center mb-2`}>
                {afterSubmit}
              </div>
            )
          }
          {
            error && (
              <div className={`text-white bg-pink-800 w-full p-3 rounded 
              font-semibold text-center mb-2`}>
                {error}
              </div>
            )
          }
          <label htmlFor="name">
            <input type="text" name="name" id="name" required
              className={`border rounded p-2 pl-3 w-full shadow-sm`}
              placeholder={`Name`} onChange={handleChange} value={form.name} />
          </label>
          <label htmlFor="password">
            <input type="password" name="password" id="password" required
              className={`border rounded p-2 pl-3 w-full shadow-sm`}
              placeholder={`Password`} onChange={handleChange} value={form.password} />
          </label>
          <button type={`submit`}
            className={`p-3 bg-pink-700 text-white font-bold rounded mt-5 shadow-xl`}>
            Submit
          </button>
        </form>
      </main>
    </>
  )
}

export default Home