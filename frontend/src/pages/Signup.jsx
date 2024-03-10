import Button from "../components/Button.jsx"
import Heading from "../components/Heading.jsx"
import InputBox from "../components/InputBox.jsx"
import SubHeading from "../components/SubHeading.jsx"
import BottomWarning from "../components/BottomWarning.jsx";
const Signup = () => {
  return (
    <div className="bg-black bg-opacity-35 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white md:max-w-[450px] w-full text-center py-6 h-screen md:h-max px-6 flex flex-col justify-center md:block">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} className='mt-1 mb-4'/>
        <InputBox placeholder="John" label={"First Name"} />
        <InputBox placeholder="Doe" label={"Last Name"} />
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
  )
}

export default Signup