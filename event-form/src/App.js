import './App.css';
import { useForm } from "react-hook-form";
import Axios from 'axios';

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data)
    Axios.post('http://localhost:3001/create', {
          firstName: data.firstName, 
          lastName: data.lastName, 
          email: data.email, 
          date: data.date
        }).then(() => {
          console.log('success');
        });
  
  }
  
  return (
    <div id="eventForm">
      <h1 className="header">Event form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input  type="text" placeholder="First name" {...register("firstName", {
          required: {
            value:true,
            message: "First name is required"},
          maxLength: {
            value: 20,
            message:"To many characters"
          },
          minLength: {
            value: 2,
            message:"You just entered only one character"
          },
          validate: {
            digit: v => !(/\d/.test(v)) || "Is your name contains any digits?",
            special: v => !(/\W/.test(v)) || "Is your name contains any special signs?"
          }
        })} />
        {errors.firstName && <span role="alert">{errors.firstName.message}</span>}
        <input label="lastName" type="text" placeholder="Last name" {...register("lastName", {
          required: {
            value:true,
            message: "Last name is required"},
          maxLength: {
            value: 20,
            message:"To many characters"
          },
          minLength: {
            value: 2,
            message:"You just entered only one character"
          },
          validate: {
            digit: v => !(/\d/.test(v)) || "Is your last name contains any digits?",
            special: v => !(/\W/.test(v)) || "Is your last name contains any special signs?"
          }
          })} />
         {errors.lastName && <span role="alert">{errors.lastName.message}</span>}
        <input type="text" placeholder="Email" {...register("email", {
          required: {
            value:true,
            message: "Email is required"},
           pattern: {
             value: /^\S+@\S+$/i,
             message: "Invalid email address"
            }
          })} />
        {errors.email && <span role="alert">{errors.email.message}</span>}
        <input type="date" placeholder="Date" {...register("date", {
          required: {
            value: true,
            message: "Date is required"},
          validate: {
            time: v => Date.parse(v)>Date.now() || "You have selected a past date!"
          }
          })} />
        {errors.date && <span role="alert">{errors.date.message}</span>}
          <br></br>
        <button data-testid="button" type="submit"> Submit </button>
      </form>
    </div>
  );
}

export default App;
