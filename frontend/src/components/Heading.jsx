
const Heading = ({label , className}) => {
  return (
   <h1 className={`font-bold text-4xl ${className}`}>
    {label}
   </h1>
  )
}

export default Heading