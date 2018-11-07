import * as React from 'react';
import {IRecipe, IIngredients, INutritionInfo} from '../interfaces/IRecipe';
import { Segment,Icon, Image, Header, Grid, GridColumn, List, ListItem } from 'semantic-ui-react';
import {connect, update} from 'react-imperator';
import { CheckoutItem } from './CheckoutItem';

export interface ICheckoutProps {
    basketRecipes?: IRecipe[];
}

export interface ICheckoutState {
}

export const Checkout =  connect(class extends React.Component<ICheckoutProps, ICheckoutState> {
  constructor(props: ICheckoutProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
      const {basketRecipes} = this.props
    return (
        <React.Fragment>
        <Grid columns="4">
        <Grid.Row>
        {basketRecipes &&
            
            basketRecipes.map((x: IRecipe, index: number) => {
                return <Segment size="small"key={index}>
                 <GridColumn>
                <CheckoutItem checkoutItem = {x}/>
                </GridColumn>
                </Segment>
                
            })}
            </Grid.Row>
            </Grid>
            </React.Fragment>
    );
  }
},["basketRecipes"])
