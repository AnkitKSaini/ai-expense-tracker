type FooterColumnProps = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group inline-flex items-center text-sm text-slate-600 transition-all duration-300 hover:translate-x-1 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterColumn;