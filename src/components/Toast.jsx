function Toast({ msg, type }) {
  if (!msg) return null

  const color = type === "error" ? "bg-red-500" : "bg-green-500"

  return (
    <div className={`fixed top-5 right-5 ${color} text-white px-4 py-3 rounded-lg shadow-lg z-50 text-sm`}>
      {msg}
    </div>
  )
}

export default Toast
