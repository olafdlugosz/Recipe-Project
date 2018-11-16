import * as React from 'react';
import {IRecipe, IIngredients, INutritionInfo} from '../interfaces/IRecipe';
import { Segment,Icon, Image,Menu, Label,Button, Header, Grid, GridColumn, List, ListItem } from 'semantic-ui-react';
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
        <Grid columns={3}>
        <Menu fixed="top" inverted>
        <GridColumn width={3}>
        
        
        <Menu.Item as="a"  position="left" style={{ marginTop:'1em', marginLeft: '3em'}}       
        onClick={ () => location.href = "#/"}>
        RecipeSearch
        </Menu.Item>
        </GridColumn>
        <GridColumn width={3}>
        <Menu.Item as="a" style={{ marginTop:'1em', marginLeft: '3em'}}      
        onClick={ () => location.href = "#/FoodSearch"}>
        Food Analyzer
        </Menu.Item>
        
        </GridColumn>
       
       
        <Menu.Item as='a' position="right" style={{ marginTop:'1em', marginLeft: '3em'}} onClick={() => location.href = "#/Checkout"}>
            <Icon name="cart arrow down" size="big"></Icon>
  
            {basketRecipes &&
                <Label color='red' floating> {basketRecipes.length}</Label>}
  
        </Menu.Item>
        
        </Menu>
        
        </Grid>
        <Grid columns="4" style={{marginTop: '6em'}}>
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
