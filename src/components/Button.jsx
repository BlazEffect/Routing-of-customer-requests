export default function Button({ handleClick, children, className }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div
      onClick={handleClick}
      className={className}
    >
      {children}
    </div>
  );
}
