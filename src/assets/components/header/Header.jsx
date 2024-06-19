import headerStyles from "./Header.module.scss"

const Header = () =>{
    return(
        <header  className={headerStyles.bgheader} >
            <h1 class="text-center">Form blog react</h1>
        </header>
    )
}

export default Header;