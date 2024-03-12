import React from 'react';
import Heading from '../components/Heading.jsx';
import SubHeading from '../components/SubHeading.jsx';
import InputBox from '../components/InputBox.jsx';
import Button from '../components/Button.jsx';
import BottomWarning from '../components/BottomWarning.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import {useNavigate} from  'react-router-dom'
const schema = yup.object({
  username: yup.string().email().required(),
  password: yup.string().required().min(6),
});

const Signin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log('Form data:', data);
    
    try {
      const resp = await axios.post('http://localhost:3000/api/v1/user/signin', data);
      const f  = resp.data;
      localStorage.setItem('token' , 'Bearer '+ f.token);
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log("Server responded with status code:", error.response.status);
        console.log("Response data:", error.response.data);
    } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
    } else {
        // Something happened in setting up the request that triggered an error
        console.log("Error:", error.message);
    }
    }
  };

  return (
    <div className="bg-black bg-opacity-35 h-screen flex justify-center">
      <div className="flex flex-col justify-center md:max-w-[450px] w-full">
        <div className="rounded-lg bg-white  text-center py-6 h-screen md:h-max px-6 flex flex-col justify-center md:block">
          <Heading label={'Sign in'} />
          <SubHeading label={'Enter your credentials to access your account'} className="mt-1 mb-4" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputBox placeholder="himanshusharma2709@gmail.com" label="Email" name="username" register={register} errors={errors} />
            <InputBox placeholder="123456" label="Password" name="password" register={register} errors={errors} />
            <div className="pt-4">
              <Button label="Sign in" type="submit" />
            </div>
          </form>
          <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
