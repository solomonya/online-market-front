const ShowIf = ({ condition, children }) => {
  if (!condition) return null;

  return children;
};

export { ShowIf };
