
const SubHeading = ({label , className}) => {
  //pt-1 px-4 pb-4
  return (
    <div className={`text-slate-500 text-md ${className}`}>
    {label}
  </div>
  )
}

export default SubHeading