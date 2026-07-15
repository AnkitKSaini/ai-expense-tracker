import { ArrowUp } from "lucide-react";

function ScrollTop() {
  function handleClick() {
    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  }

  return (
    <button
      onClick={handleClick}
      className="
fixed
bottom-6
right-6
z-50
rounded-full
bg-blue-600
p-4
text-white
shadow-xl
transition-all
duration-300
hover:-translate-y-2
hover:bg-blue-700
"
    >
      <ArrowUp size={22} />
    </button>
  );
}

export default ScrollTop;
