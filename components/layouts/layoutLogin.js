import Header from "./header";
import Nav from "./nav";
import Footer from "./footer";

const LayoutLogin = (props) => (
  <div className="Layout">
    <Header />
    <div className="Content">{props.children}</div>
    <Footer />
  </div>
);

export default LayoutLogin;
