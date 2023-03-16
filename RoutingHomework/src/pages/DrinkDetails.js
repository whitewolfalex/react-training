import { useEffect } from 'react';
import { Link, resolvePath, useLocation, useParams, useRouteLoaderData } from 'react-router-dom';
import './DrinkDetails.css';
import sanitizeTextForURL from './UTILS';

function DrinkDetails() {
    const { categoryName, drinkName } = useParams();
    // const routeLoaderData = useRouteLoaderData('root2');
    const locationData = useLocation();
    let strDrinkThumb = locationData.state.strDrinkThumb;

    useEffect(() => {

        return () => {
            console.log("Location data for preview drink", locationData);
        }
    }, [locationData])

    useEffect(() => {

        return () => {

        }
    }, [])



    return <>
        <div className='preview-drink-container' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Link to={`/${sanitizeTextForURL(categoryName)}`} className='button'>
                <input type='button' name='Back' value='Back' style={{ padding: '25px', borderRadius: '20px' }} className='button' />
            </Link>
            <div className='drink-container'
                style={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    margin: 'auto',
                    justifyContent: 'space-between',
                    width: '300px',
                    height: '350px',
                    padding: '100px'
                }}> {drinkName}

                <img
                    src={strDrinkThumb}
                    alt=''
                    className='img-container'
                    style={{
                        width: '300px',
                        height: '300px',

                    }}
                />
            </div>
        </div>

    </>;
}



export default DrinkDetails;







































    // async function fetchByCateg() {
    //     const resp =
    //         await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=
    //         ${categoryName.replace('/', '%2F')}`)
    //             .then((res) => {
    //                 const drinks = res.json();
    //                 ////console.log(drinks)
    //                 // setCurrentList(drinks)
    //                 return drinks;
    //             });
    //     const data = await resp;

    // }
    // async function fetchDrinks() {
    //     console.log(categoryName);
    //     const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`);

    //     const data = await resp.json();

    //     console.log('CHECK', data);
    // }