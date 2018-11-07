import * as React from 'react';
import { IRecipe, IIngredients } from 'ClientApp/interfaces/IRecipe';
import {  Router, Route, Link, Redirect} from "react-router-dom";
import { Segment, Image, Header, Grid, GridColumn, List, ListItem } from 'semantic-ui-react';
import {RecipeDetail} from './RecipeDetail'
import Store from "../interfaces/Store";
import {RecipeSearch} from "./RecipeSearch";

export interface IRecipeProps {
    recipe: IRecipe
}

export interface IRecipeState {
}

export class Recipe extends React.Component<IRecipeProps, IRecipeState> {
  constructor(props: IRecipeProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
     const {recipe} = this.props
    
    return (
      <Segment>

        <Header as ="h3">{recipe.label}</Header>
        <Image size ="small" label = {recipe.source} src = {recipe.image}></Image>
       
        <div>
        <Link to="/RecipeDetail" onClick={() => Store.selectedRecipe = recipe}>Details</Link>
        
        </div>       
      </Segment>
    );
  }
}
