import Header from "./header";
import Nav from "./nav";
import Footer from "./footer";

const Layout = (props) => (
  <div className="Layout">
    <Header />
    <Nav titulo={props.tituloNav} tipoUsuario={props.tipoUsuario}/>
    <div className="Content">{props.children}</div>
    <Footer />
  </div>
);

export default Layout;
