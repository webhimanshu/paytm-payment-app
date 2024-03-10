import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'

const Signin = () => {
  return (
    <div className="bg-black bg-opacity-35 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white md:max-w-[450px] w-full text-center py-6 h-screen md:h-max px-6 flex flex-col justify-center md:block">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} className='mt-1 mb-4'/>
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
  )
}

export default Signin