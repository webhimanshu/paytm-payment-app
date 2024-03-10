
const InputBox = ({label  , placeholder , onChange}) => {
  return (
    <div>
    <div className="text-sm font-medium text-left my-2">
    {label}
  </div>
    <input placeholder={placeholder} className="w-full px-2 py-1 border rounded border-black border-opacity-55" onChange={onChange}/>
  </div>
  )
}

export default InputBox