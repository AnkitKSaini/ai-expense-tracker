import { motion } from "framer-motion";

import FooterColumn from "./FooterColumn";

import {
  PRODUCT_LINKS,
  COMPANY_LINKS,
  RESOURCE_LINKS,
  LEGAL_LINKS,
} from "./footer.data";

function FooterLinks() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
        delay: 0.1,
      }}
      className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
    >
      <FooterColumn
        title="Product"
        links={PRODUCT_LINKS}
      />

      <FooterColumn
        title="Company"
        links={COMPANY_LINKS}
      />

      <FooterColumn
        title="Resources"
        links={RESOURCE_LINKS}
      />

      <FooterColumn
        title="Legal"
        links={LEGAL_LINKS}
      />
    </motion.div>
  );
}

export default FooterLinks;