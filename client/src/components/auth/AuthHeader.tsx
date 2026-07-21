import { motion } from "framer-motion";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="text-center"
    >
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">
        {title}
      </h1>

      <p className="mt-3 text-slate-600 dark:text-slate-400">
        {subtitle}
      </p>
    </motion.div>
  );
}

export default AuthHeader;