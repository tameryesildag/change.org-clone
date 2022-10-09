import Footer from "../Footer/Footer";
import MainNavigator from "../MainNavigator/MainNavigator";
import styles from "./Layout.module.css";

function Layout(props) {
    return (
        <div>
            <MainNavigator></MainNavigator>
            <main className={styles.main}>
                {props.children}
            </main>
            <Footer></Footer>
        </div>
    )
}

export default Layout;