import * as React from 'react';
import {Container} from 'semantic-ui-react';
import { RecipeSearch } from './RecipeSearch';
import {HashRouter, Switch, Route} from "react-router-dom";
import { RecipeDetail } from './RecipeDetail';
import {FoodSearch} from './FoodSearch';
import {Checkout} from './Checkout';

export interface IHomeProps {
}

export interface IHomeState {
}

export class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <Container>
      <Switch>
  <Route exact path='/' component={RecipeSearch}/>
  {/* both /roster and /roster/:number begin with /roster */}
  <Route path='/Checkout' component={Checkout}/>
  <Route path='/RecipeDetail' component={RecipeDetail}/>
  <Route path='/FoodSearch' component={FoodSearch}/>
</Switch>
        
      </Container>
    );
  }
}





