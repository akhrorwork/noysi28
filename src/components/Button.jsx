export const Button = ({
  type = "primary", // primary, secondary, info, warning, error
  size = "md", // sm, md, lg
  outline = false,
  loading = false,
  children,
  ...props
}) => {
  const baseClass = "btn";
  const typeClass = outline ? `btn-outline btn-${type}` : `btn-${type}`;
  const sizeClass = `btn-${size}`;

  return (
    <button
      disabled={loading}
      className={`${baseClass} ${typeClass} ${sizeClass} btn-block`}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};
