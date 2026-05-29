/**
 * Shared Framer Motion variants used across Client Components.
 * Kept in lib/ so they can be imported without circular deps.
 */

export const itemVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};
