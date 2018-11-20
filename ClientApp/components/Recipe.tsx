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
  isAdded: boolean;
}

export const Recipe = class extends React.Component<IRecipeProps, IRecipeState> {
  constructor(props: IRecipeProps) {
    super(props);

    this.state = {
      isAdded: false
    }
  }
  private addToBasket = () => {

    const recipe = this.props.recipe;

      update<IRecipe[]>("basketRecipes", (basket: IRecipe[]) =>{
        if(basket && basket.some((item) => recipe == item) ){
          return [...(basket || [])];
        }else{
        console.log("basket:", basket)
        recipe.isAdded = true;
        return [...(basket || []),this.props.recipe]}})
      
    
 
  }
  private formatRecipeLabel = (label:string) => {
    let stringToSplit = label.split(" ");
    return stringToSplit[0] + " " + stringToSplit[1];
  }

  public render() {
     const {recipe} = this.props;
     const {isAdded} = this.state;
    
    return (
      <React.Fragment>
   
        <Header as ="h3">{recipe.label.length > 35? this.formatRecipeLabel(recipe.label) : recipe.label }</Header>
        <Image size ="small" label = {recipe.source} src = {recipe.image}></Image>

        <div>
        <Link to="/RecipeDetail" style={{marginRight: "5px"}}  onClick={() => Store.selectedRecipe = recipe}>Details</Link>
        
        
        <span>     Add To Basket</span>
        {recipe.isAdded?<Icon name="minus circle" size ="large"/> :<Icon name="plus circle" size ="large"onClick={this.addToBasket}/>}
        </div>
        </React.Fragment>
    );
  }
}
