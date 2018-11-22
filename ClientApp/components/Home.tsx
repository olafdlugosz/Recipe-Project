import * as React from 'react';
import { RecipeSearch } from './RecipeSearch';
import { Switch, Route } from "react-router-dom";
import { RecipeDetail } from './RecipeDetail';
import { FoodSearch } from './FoodSearch';
import { Checkout } from './Checkout';
import { CheckoutItemDetail } from './CheckoutItemDetail';


export class Home extends React.Component {

  public render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={RecipeSearch} />
          <Route path='/Checkout' component={Checkout} />
          <Route path='/RecipeDetail' component={RecipeDetail} />
          <Route path='/FoodSearch' component={FoodSearch} />
          <Route path='/CheckoutItemDetail' component={CheckoutItemDetail} />
        </Switch>
      </div>
    );
  }
}





