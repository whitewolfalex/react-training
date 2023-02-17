import CategoriesNav from './CategoriesNav';
import './Header.css'

const Header = ({selectCategory}) => {


    return (
        <>
            <div className="HeaderTitle">Cocktails</div>
            <CategoriesNav selectCategory={selectCategory}/>
        </>
    );
}

export default Header;