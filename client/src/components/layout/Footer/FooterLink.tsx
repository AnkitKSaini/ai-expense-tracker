import { Link } from "react-router-dom";

interface Props {
  to: string;
  children: React.ReactNode;
}

function FooterLink({
  to,
  children,
}: Props) {
  return (
    <Link
      to={to}
      className="
        group
        flex
        items-center
        gap-2
        text-gray-500
        transition-all
        duration-300
        hover:translate-x-2
        hover:text-blue-600
        dark:text-gray-400
        dark:hover:text-blue-400
      "
    >
      <span
        className="
          h-1.5
          w-1.5
          rounded-full
          bg-blue-500
          opacity-0
          transition
          duration-300
          group-hover:opacity-100
        "
      />

      {children}
    </Link>
  );
}

export default FooterLink; 