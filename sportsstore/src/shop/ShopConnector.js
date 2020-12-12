import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadData, placeOrder } from "../data/ActionCreators";
import { DataTypes } from "../data/Types";
import { Shop } from "./Shop";
import { cartInit, addToCart, updateCartQuantity, removeFromCart, clearCart }
    from "../data/CartActionCreators";
import { CartDetails } from "./CartDetails";
import { DataGetter } from "../data/DataGetter";
import { Checkout } from "./Checkout";
import { Thanks } from "./Thanks";

const mapStateToProps = (dataStore) => ({
    ...dataStore
})

const mapDispatchToProps = {
    loadData, 
    cartInit, addToCart, updateCartQuantity, removeFromCart, clearCart,
    placeOrder
}

// const filterProducts = (products = [], category) =>
//     (!category || category === "ALL")
//         ? products
//         : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

export const ShopConnector = connect(mapStateToProps, mapDispatchToProps)(
    class extends Component {
        render() {
            return <Switch>
                <Route path={"/shop/products/:category/:page"}
                    render={(routeProps) =>
                        <DataGetter {...this.props} {...routeProps}>
                            <Shop {...this.props} {...routeProps} />
                        </DataGetter>
                    } />
                <Route path="/shop/cart" render={(routeProps) =>
                    <CartDetails {...this.props} {...routeProps} />} />
                <Route path="/shop/checkout" render={(routeProps) =>
                    <Checkout { ...this.props } { ...routeProps } /> } />
                <Route path="/shop/thanks" render={ routeProps =>
                    <Thanks { ...this.props } { ...routeProps } /> } />
                <Redirect from="/shop/products/:category"
                    to="/shop/products/:category/1" extact={true} />
                <Redirect to="/shop/products/all/1" />
            </Switch>
        }

        componentDidMount() {
            this.props.loadData(DataTypes.CATEGORIES);
            // this.props.loadData(DataTypes.PRODUCTS);
        }
    }
)