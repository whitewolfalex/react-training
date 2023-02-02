import './Header.css';

const Header = () => {
    return (
        <div className='Header'>
            <div className='HeaderTitle'>Cocktails</div>
            <div className="Navbar">
                <div className='Beverage'>Alcoholic</div>
                <div className='Beverage'>Non Alcoholic</div>
                <div className='Beverage'>Ordinary drinks</div>
                <div className='Beverage'>Cocktail glass</div>
                <div className='Beverage'>Champagneflute</div>
            </div>
        </div>

    );
}

export default Header;