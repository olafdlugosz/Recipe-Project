import * as React from 'react';
import { IFoodDetails, IMergedIFoodForTable, IUnitInfo, ITotalDaily, ITotalNutrients, IIngredient, IParsed } from 'ClientApp/interfaces/IFoodDetails';
import { Container, Segment,TableRow, Icon, Image, Grid, Header, List, Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, Item, GridColumn } from 'semantic-ui-react';
export interface IFoodDetailProps {
    foodDetails: IFoodDetails
}

export interface IFoodDetailState {
}

export class FoodDetail extends React.Component<IFoodDetailProps, IFoodDetailState> {
  constructor(props: IFoodDetailProps) {
    super(props);

    this.state = {
        mergedInfo: []
    }
  }


private formatNutritionInfoTotal = (total: number) => {
    let tot = total.toString();
    if(tot.indexOf(".") > -1){     
      let totArray = tot.split(".");
      let finalString = totArray[0] + "." + totArray[1].substring(0,2);
      return finalString;
    }else{
      return tot;
    }
  }

  public render() {
      const {foodDetails} = this.props;
    return (
      <div>

      {foodDetails?  
      <Grid celled columns={2}>
      <GridColumn>
        <Table>
        <TableHeader>
        <TableRow>
        <TableHeaderCell>Element</TableHeaderCell>
        <TableHeaderCell>Amount</TableHeaderCell>
        </TableRow>
        </TableHeader>
        <TableBody>
        <React.Fragment>
        {Object.keys(foodDetails.totalNutrients).map((key: any, index: number) => {
          return <Table.Row key={index}>
          <TableCell>
          {foodDetails.totalNutrients[key].label}          
          </TableCell>
          <TableCell>
          {this.formatNutritionInfoTotal(foodDetails.totalNutrients[key].quantity)}
          {foodDetails.totalNutrients[key].unit}
          </TableCell>
          
        
                     
          </Table.Row>;
        })}

      </React.Fragment>
        </TableBody>
        </Table>
        </GridColumn>
        <GridColumn>
        <Table>
        <TableHeader>
        <TableRow>
        <TableHeaderCell>Element</TableHeaderCell>
        <TableHeaderCell>RDI</TableHeaderCell>
        </TableRow>
        </TableHeader>
        <TableBody>
        <React.Fragment>
        {Object.keys(foodDetails.totalDaily).map((key: any, index: number) => {
          return <Table.Row key={index}>
          <TableCell>
          {foodDetails.totalNutrients[key].label}          
          </TableCell>
          <TableCell>
          {this.formatNutritionInfoTotal(foodDetails.totalDaily[key].quantity)}
          {foodDetails.totalDaily[key].unit}
          </TableCell>
          
        
                     
          </Table.Row>;
        })}

      </React.Fragment>
        </TableBody>
        </Table>
        </GridColumn>
        </Grid>
    : ""}
      </div>
    );
  }
}
