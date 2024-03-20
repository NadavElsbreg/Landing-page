import "./css/headers.css";
import logo from "./assets/Ndvlogo.svg";

function headerMainPage() {
  const signOut = () => {
    document.cookie =
      "authKey=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("signed out");
  };

  return (
    <header>
      <div className="logo">
        <img src={logo} className="svg-container" alt="logo" />
      </div>
      <div className="buttons">
        <button onClick={() => (window.location.href = "login.html")}>
          Log in
        </button>
        <button onClick={() => (window.location.href = "signup.html")}>
          Sign Up
        </button>
        <button onClick={signOut}>Sign out</button>
      </div>
    </header>
  );
}

export default headerMainPage;
