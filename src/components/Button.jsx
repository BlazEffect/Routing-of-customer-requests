export default function Button({ handleClick, children, className }) {
  return (
    <div
      onClick={handleClick}
      className={className}
    >
      {children}
    </div>
  );
}
