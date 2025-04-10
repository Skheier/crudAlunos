export function Card({ children }) {
    return (
      <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children }) {
    return <div style={{ padding: "10px" }}>{children}</div>;
  }