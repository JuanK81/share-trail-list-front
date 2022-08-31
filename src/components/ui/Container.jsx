
export const Container = ({className, height,  margin, padding, children}) => {
  return (
    <div
      style={{
        margin: `${margin}`,
        padding: `${padding}`,
        height: `${height}`,
      }}
      className={`container-basic ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
