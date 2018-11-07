import * as React from 'react';
import { IRecipe, IIngredients } from 'ClientApp/interfaces/IRecipe';
import {  Router, Route, Link, Redirect} from "react-router-dom";
import { Segment,Icon, Image, Header, Grid, GridColumn, List, ListItem } from 'semantic-ui-react';
import {RecipeDetail} from './RecipeDetail'
import Store from "../interfaces/Store";
import {RecipeSearch} from "./RecipeSearch";
import {connect, update} from 'react-imperator';

export interface IRecipeProps {
    recipe: IRecipe;
   // basketRecipes?: IRecipe[];
}

export interface IRecipeState {
}

export const Recipe = class extends React.Component<IRecipeProps, IRecipeState> {
  constructor(props: IRecipeProps) {
    super(props);

    this.state = {
    }
  }
  private addToBasket = () => {

      update<IRecipe[]>("basketRecipes", (basket: IRecipe[]) =>{
        console.log("basket:", basket)
        return [...(basket || []),this.props.recipe]})
    
 
  }

  public render() {
     const {recipe} = this.props
    
    return (
      <Segment>
   
        <Header as ="h3">{recipe.label}</Header>
        <Image size ="small" label = {recipe.source} src = {recipe.image}></Image>

        <div>
        <Link to="/RecipeDetail" onClick={() => Store.selectedRecipe = recipe}>Details</Link>
        
        
        <span>     Add To Basket</span>
        <Icon name="plus circle" size ="large"onClick={this.addToBasket}/>
        </div>
        </Segment>
    );
  }
}
