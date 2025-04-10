export function Button({ children, onClick }) {
    return (
      <button onClick={onClick} style={{ padding: "10px", background: "red", color: "white", borderRadius: "5px" }}>
        {children}
      </button>
    );
  }
  