import { forwardRef, useImperativeHandle, useState } from 'react';
import CategoriesNav from './CategoriesNav';
import './Header.css'
import SearchBar from './SearchBar';

const Header = forwardRef((props, ref) => {

    const [enabled, setEnabled] = useState(true);


    const renderContent = () => {
        if (enabled === true) {
            return (
                <SearchBar findDrink={props.findDrink} resetView={props.resetView} />
            );
        } else {
            return <></>;
        }

    }

    useImperativeHandle(ref, () => ({
        openCreateDrinkView() {
            setEnabled(!enabled);
        }
    }));

    // function openCreateDrinkView(param) {
    //     setEnabled(param);
    // }

    return (
        <>
            <div className="HeaderTitle">Cocktails</div>
            <CategoriesNav
                selectCategory={props.selectCategory}
                triggerFetchByCategory={props.triggerFetchByCategory}
            />
            {renderContent()}
        </>
    );
});

export default Header;