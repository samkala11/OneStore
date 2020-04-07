import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as OrderPureFunctions from '../../util/order_pure_fucntions';
import classNames from 'classnames';

class OrderShowPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            lineQuantities: {

            },
            originalLineQuantities : {

            },
            displayUpdateButtons: {

            }
        }
        this.update = this.update.bind(this);
        this.stateIncludesLine = this.stateIncludesLine.bind(this);
        this.QuantityChanged = this.QuantityChanged.bind(this);
    }

    componentDidMount(){
        const { currentOrderLines }  = this.props;
        let linesArray = OrderPureFunctions.objectValuesArray(currentOrderLines);

        let lineQuantities = Object.assign({}, this.state.lineQuantities) ;

        linesArray.forEach(line => {
            lineQuantities[line.id]  = line.quantity
        });
        this.setState({ lineQuantities: lineQuantities });
        this.setState({ originalLineQuantities: lineQuantities });
    }

    update(field) {
        let lineQuantities = Object.assign({}, this.state.lineQuantities);

        return e => {
            lineQuantities[field]  = e.currentTarget.value
            // debugger;
            this.setState({ lineQuantities: lineQuantities})
            // this.QuantityChanged(field);
            setTimeout(() => { this.QuantityChanged(field) })
        }
    }

    QuantityChanged(lineId) {
        const { originalLineQuantities, lineQuantities } = this.state;
        let displayUpdateButtons = Object.assign({}, this.state.displayUpdateButtons)
        // debugger;
        if  (originalLineQuantities[lineId] != lineQuantities[lineId]) {
            displayUpdateButtons[lineId] = true;
            this.setState({ displayUpdateButtons: displayUpdateButtons })
            console.log('quantity changed and updated in state');
        } else {
            displayUpdateButtons[lineId] = false;
            this.setState({ displayUpdateButtons: displayUpdateButtons })
            console.log('quantity returned back to original and updated in state'); 
        }
    }

    stateIncludesLine(lineId) {
        const { lineQuantities } = this.state;
        let linesArray = Object.values(lineQuantities);
        for (let index = 0; index < linesArray.length; index++) {
            if (linesArray[index].id == lineId) return true;           
        }
        return false;
    }


   render() {
      window.orderShowProps = this.props;
      window.orderShowstate = this.state;

      const { currentOrderLines } = this.props;
      const { lineQuantities } = this.state;
      const currentLinesArray = Object.values(currentOrderLines);
      let key = 0;
      return(
         <div className="order-show-container">
                    Order Summary
                { 
                    currentLinesArray.map(line => (
                        <div className="order-line-show"
                            key = {key++}
                            >
                            <span> 
                                {line.productName}
                            </span>
                            <span> 
                                quantity: <input
                                    // className="quantity-input"
                                    className={classNames({ 'quantity-input': true })}
                                    type="text"
                                    value = { lineQuantities[`${line.id}`] }
                                    onChange = {this.update(line.id)}
                                />
                            </span>
                            <span> 
                                Unit price: {line.productPrice}
                            </span>
                            <span> 
                                Line total: {line.line_total}
                            </span>
                            <button
                                className={classNames({ hidden: !this.state.displayUpdateButtons[line.id] }) }
                            > Update </button>
                         </div>
                    ))
                }
         </div>
      )
   }
}



const mapStateToProps = state => ({
   currentOrderLines: state.orders.currentOrderLines
 });
 
 const mapDispatchToProps = dispatch => ({
//    getAllProducts: () => dispatch(ProductActions.getAllProductsThunk()),
});
 
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderShowPage));




