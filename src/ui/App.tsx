import React, {useEffect} from 'react';
import '../App.css';
import {Route, Switch} from "react-router-dom";
import {Header} from "./Header/Header";
import {Basket} from "./Basket/Basket";
import {Main} from "./Main/Main";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {restoreState} from "../utils/saveToLocalStorage";
import {setProductsToBasket} from "../bll/actions/actions";
import {selectProductsWithTotal} from '../bll/selectors/re-select';
import style from "./App.module.scss"
import {loginTC} from "../bll/authReducer";


export const App = () => {


    const productsWithTotal = useSelector<AppRootStateType, any>(selectProductsWithTotal)
    const {user, isAuth} = useSelector<AppRootStateType, any>(state => state.auth)

    const dispatch = useDispatch()


    const productsFromLocalStorage = restoreState("productToStorage", productsWithTotal)
    // Restore from local storage
    const userFromLS = restoreState("user", user)

    useEffect(() => {
        dispatch(setProductsToBasket(productsFromLocalStorage))
        if (isAuth) {
            dispatch(loginTC(userFromLS))
        }
        return () => {
            localStorage.removeItem('user')
        }
    }, [dispatch])


    return (
        <div className={`${style.app} ${style.appContainer}`}>
            <Header/>
            <main>
                <div>
                    <Switch>
                        <Route exact path="/" render={() => <Main/>}>
                        </Route>
                        <Route path="/basket" render={() => <Basket/>}>
                        </Route>
                    </Switch>
                </div>
            </main>
        </div>
    )
}

export default App;
