import Button from "../components/Button.jsx"
import Heading from "../components/Heading.jsx"
import InputBox from "../components/InputBox.jsx"
import SubHeading from "../components/SubHeading.jsx"
import BottomWarning from "../components/BottomWarning.jsx";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().email().required(),
    password: yup.string().required(),
  });


const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  })

   
  const onSubmit = async (data) => {
     const response= await axios.post('http://localhost:3000/api/v1/user/signup', data);
     const payload = response.data;
     localStorage.setItem('token', "Bearer " + payload.token);
   }



  return (
    <div className="bg-black bg-opacity-35 h-screen flex justify-center">
    <div className="flex flex-col justify-center max-w-full md:max-w-[450px] w-full">
      <div className="rounded-lg bg-white  w-full text-center py-6 h-screen md:h-max px-6 flex flex-col justify-center md:block">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} className='mt-1 mb-4'/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputBox placeholder="John" name='firstName' label={"First Name"} register={register} errors={errors}/>
            <InputBox placeholder="Doe" name="lastName" label={"Last Name"} register={register} errors={errors}/>
            <InputBox placeholder="harkirat@gmail.com" name='username' label={"Email"} register={register} errors={errors} />
            <InputBox placeholder="123456" label={"Password"} name='password' register={register} errors={errors}/>
            <div className="pt-4">
              <Button label={"Sign up"} type='submit'/>
            </div>
        </form>
      
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
  )
}

export default Signup