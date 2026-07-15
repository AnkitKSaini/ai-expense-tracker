interface Props {
  title: string;
  children: React.ReactNode;
}

function FooterSection({
  title,
  children,
}: Props) {
  return (
   <div
className="
transition-all
duration-300
hover:-translate-y-1
"
>

      <h3 className="
mb-6
text-lg
font-semibold
tracking-wide
text-gray-900
dark:text-white
">
        {title}
      </h3>

      <div className="space-y-3">

        {children}

      </div>

    </div>
  );
}

export default FooterSection;