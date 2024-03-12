
const InputBox = ({label  , placeholder , onChange , name , register , errors}) => {


  return (
    <div>
    <div className="text-sm font-medium text-left my-2">
    {label}
  </div>
    <input   {...(register && { ...register(name) })} placeholder={placeholder} name={name} className="w-full px-2 py-1 border rounded border-black border-opacity-55" onChange={onChange}/>

    {
      errors && (
        <div className={`text-red-600 text-sm font-normal text-left select-none`}>
                   {errors?.[name]?.message}
               </div>
      )
    }
  </div>
  )
}


export default InputBox