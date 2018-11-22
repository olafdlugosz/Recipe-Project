import * as React from 'react';
import { IRecipe} from 'ClientApp/interfaces/IRecipe';
import { Link} from "react-router-dom";
import {Icon, Image, Header } from 'semantic-ui-react';
import Store from "../interfaces/Store";
import {update} from 'react-imperator';
import "../css/styles.css";

export interface IRecipeProps {
    recipe: IRecipe;
}


export const Recipe = class extends React.Component<IRecipeProps> {
  constructor(props: IRecipeProps) {
    super(props);
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
  public render() {
     const {recipe} = this.props;
    
    return (
      <React.Fragment >
     
        <Header as ="h3" className="wordWrap" >{recipe.label}</Header>
        
        <Image size ="small" label = {recipe.source} src = {recipe.image}></Image>

        <div>
        <Link to="/RecipeDetail" style={{marginRight: "5px"}}  onClick={() => Store.selectedRecipe = recipe}>Details</Link>
        
        
        <span style={{marginLeft:"2em"}}>     Bookmark</span>
        {recipe.isAdded?<Icon name="minus circle" size ="large"/> :<Icon name="plus circle" size ="large"onClick={this.addToBasket}/>}
        </div>
        
        
        </React.Fragment>
    );
  }
}
