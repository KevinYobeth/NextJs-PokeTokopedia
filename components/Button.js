export default function Button({ children, type = 'primary', onClick = null }) {
  const BUTTON_TYPE_CLASS = {
    primary: 'bg-gray-800 hover:bg-gray-900 text-white',
    secondary: 'bg-gray-300 hover:bg-gray-200 text-black',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  return (
    <button className={`w-full rounded-md p-3 ${BUTTON_TYPE_CLASS[type]} -translate-y-1.5 
      hover:-translate-y-2.5 active:-translate-y-1 duration-300 active:duration-75 
      transition-transform`}
      onClick={onClick}>
      <p className='font-poppins text-center'>{children}</p>
    </button>
  );
}
