import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';


class NavBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            newOrderExist: false,
            orderLines: [],
            showSearchBar: false,
            homeIconClicked: false,
            searchIconClick: false,
            cartIconClicked: false
        }

        this.toggleSearchBar = this.toggleSearchBar.bind(this);
        this.handleIconClicked = this.handleIconClicked.bind(this);
    }

    getLinesQuantity() {
        let orderLinesArray;
        let lineQuantity = 0;
        const { currentOrderLines } = this.props;
        if (currentOrderLines) {
            orderLinesArray = Object.values(currentOrderLines);
        }
        console.log('orderlines array', orderLinesArray);
        // orderLinesArray.forEach(line => {
        //     // debugger;
        //     lineQuantity += line.quantity;
        // });
        lineQuantity = orderLinesArray.length;
        if (lineQuantity > 0) {
            return lineQuantity
        } else {
            return null
        }
        // this.setState({ orderLines: orderLinesArray })
    }

    toggleSearchBar () {
        console.log('toggle search bar called')
        this.setState({showSearchBar: !this.state.showSearchBar})
    }

    handleIconClicked(iconName, path) {
        console.log(`handle navigation icon clicked called for ${iconName}`)
        this.setState({ [`${iconName}IconClicked`]: true });
        this.timer4 = setTimeout(() => this.setState({ [`${iconName}IconClicked`]: false }), 200);
        this.timer5 = setTimeout(() => this.props.history.push(`${path}`), 200);
    }



   render() {
        const { newOrderExist, showSearchBar } = this.state;
        const { currentOrder, title, isHomeNavBar } = this.props;
        window.heyyyState = this.state;
        window.navprops = this.props;
        return(
            <div className="navbar-container">
                <div 
                    className={classNames({ 'header': true, 'header-home': isHomeNavBar })}
                    id="header"
                > 
                    {title}  
                </div>

                <div className="nav-links-container">
                   <div 
                        className={classNames({ 'home-link': true, 'current-link': window.location.hash === '#/' })}
                        > 
                        {/* <span  
                            onClick = { () => this.handleIconClicked('home', '/') }
                            className={classNames({ 'fas': true, 'fa-home': true, 'icon-clicked': this.state.homeIconClicked })}
                            // className="fas fa-home"
                        > </span> */}

                        {  (window.location.hash !== '#/') &&  <img
                            onClick = { () => this.handleIconClicked('home', '/') }  
                            className={classNames({ 'icon-clicked': this.state.homeIconClicked })}
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAHDklEQVR4nO2bTWxcVxXHf+fO2JZClKrUBISaOKKAQhW6oA5fgZK2QYqTcU2jKiCS1nJsVCV2UpoFLHkIiWWoPGNHluxxmsYVEqpQsMdNRNqwYUO6YBEEbQOxI5QsmkS0QD5m/O5h4Xljz3jefNwZ25OG/8bz3jnnf+77v3vO+7jPQhF4nmc2trc+L/CZYvZ7DVbl2oHYoddERAtt0WIBG9tbnwdOLPG+RyGiJKeGAU4W2kxIzK5lHdEqQEzxY1oyA1RVxlND36mS/5/ARNHE0KLw4yr5gthXFO6GmPcBD1dMprpdVaWwDKTQLzk9+CjW/KWqgSpv9HQOPFfMNjI50tokmQ+q4QsQSdPavWfgRjFbcir+Bsieavh85NEfxfr/unjfkhIQG9le1SgBFWbCbFGbbq6WL8CdNU2hsSoSmjMMEXR74b4lAiha7fRH0Nkwm2mOOgsQ8TOhsQKhOUMhsuTY8gRQVQGqFgA1M2EmY313AUrHVi+A1Sezx5hDngDjb8a/BHy6Wt45K6GDyWjEWQBfmlvCbGrtTNWEwvrR1PDmxbvyBHCpfwC7JhIqQBQNPYhyMBo+A1oiXHbhLOwD+SXgUP/AzRe/++KHYUZfrfMMkEh47P5dRz4C/lU9aX4fyAngXv/h0x9A1LiXQPnYmapJC/pATgDX+ke05CBKncVyMOVnj8OVIL8P5ARwrX8oLYCCcw+wREvHOtwLQH4fWCgBt/pHtPRZEBX3HrAcMwDy+oCBGuofUFPuLKi7AGVi1ZaefaFY1AcM1FD/gFC6CdpaZoApHet0NzgfmOsDBmqpfyCdnimZy7jPgHL9wzaVzl0KQR+YLwHH+gc+7Hn25ZLX4lqaYLn+0bfz6E3gIzfy+T5gaql/KrgOC+4lYCvrH25lkO0Dppb6pxIBtIYmWElsiUfxMnHrR1PDmw0a+bYTAUCZSyCACk3O9GLKlo+qowBARHjCqLLWlUANc2V94EFXfsGWjxUyrvyKrjOIw2NlLjdlZ49Y/aYrP8gT5TyM8i1XdqPyd2PSc2+Bo4rK1mQq0RVmHpuOdyDyddcBAo+PT8a/F2ZMphIxha86ct/xo3f/YLKXsXFHElBOjk3FnyncPTYd7xArrzvzBvQiRfmTqUQM5VQN1ON9O4/eFICTZ4+vn8v4F4CNFQZfyf7N+Qv8SdE/zo+abxSc+SX+tfALsq3gzFfFL3DZj6bbcwIAjE4d32LwUxWQXLG+PC3NEhHfvg18djn8I2ZO1ETeQtlQiX9TVI0P5yrw/0dE6OjePfAeLHoa7IsdvIix7cAIkC4SeEvR4UxL02N9Xf2XejsOvduC2YIyCtypt39P50vvZ5qbvgwcB26V8+/ePfCepDOPZcdfzP+2QjzT0vSV4OChyMIIwMjvRx5ovjv3tAptYq21wmX8Ned7u3r/HeYfvZN5CqHNqGq9/U9ND65Lq3lSrG4CKOc/MTX8YFr0a6gdUGQ3gKr+vLfzsFfoW1SAjwvGJuOeiPwMwgUIWxy9b1B0edzzPNO2tXUfwOyF6xOe51nXBPXkWg4UFWDD45/ar6qvArRtbQV4zTVBPbmWAyElYD+X+2X1kdpS1I8rOTn03FgqsbdweasWFJ0BjYjkVOIg6LAonEglFPhNPXjviSbonfeiwE+CbVWT95HD4PSg+/JbDeNaMbT996FngU0Agl5be/uD3wW25GRiYq01t5OpxC9duO8JAVQ5urAlib17vTRAcjr+FMIPAUHZ58Ld8AKMTSYWP1jdMmlGApvYxcJwxoW/4QUQWThIRU8E3wy9mkp8UZGOwOQjr7jwN7QA428e3wQEL0TUKPHA5s+Xxfy6Bjpd+PFTpWhoAfD9lwgu1cJUT+fhvwGMnjn2SWB/4CYqv3JN0bACnJoeXKfQE2zrooM0fvMh4BNZy8XuWP/brnkaVoCMb/qAB7Kbf+6N9Z/PGZWDi34fK/YNcKVoSAG8815UhSPB9uKz73meIXf2ufqfiNb03rGut8Kjp4c+byJ6BsD6srOvq/+SC8+GW617gDYIbnyu/zqweZ5nk1Px7wvyAys6dGTXkbBPaStCXQWQCF3AIwARo88Ax5x4rL6MBM87Czc+AQ7EDp8FztYy1gB1LQH1OQ1cAnlfIva0C0epG5/lQF1nQHbKf6EmEpEdoNmfcrJ7T3/Rj6XrhYZrgor5raDXUN61c/YXy52v4QToix28OPvOjYcPdA5s7u06fHW58zWcADDf6VcqV0MKsJJY0VdiImbb+FTipyuVT5FtQUMNwwq/E9QdCjtWMF9Zj/u+BP4vwGoPYLVx3wsgubU7XfhwQZEdoNlmJecEPeeaIJ9rNVFwHMLV2QvXJ2RscugFkfm1u/sNIrxgjNGPy/9IVw1V1ejshesTG9sfUpAtqz2glYVevPLOjdf/B6d/6aR0dUDdAAAAAElFTkSuQmCC"></img>
                            }
                        
                        { (window.location.hash === '#/') && <img
                            onClick = { () => this.handleIconClicked('home', '/') }  
                            className={classNames({ 'icon-clicked': this.state.homeIconClicked })}
                            src="data:image/png;base64,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"></img>
                        }

                   
                   </div> 

                   <div
                        className={classNames({ 'search-link': true, 'current-link': window.location.hash === '#/search' })}
                        // to='/search'
                        > 
                        {/* <i  onClick = { () => this.handleIconClicked('search', '/search')}
                            className={classNames({ 'fas': true, 'fa-search': true, 'icon-clicked': this.state.searchIconClicked })}
                            // className="fas fa-search"
                            ></i> */}


                            { (window.location.hash !== '#/search') && <img
                                onClick = { () => this.handleIconClicked('search', '/search')} 
                                className = {classNames({ 'search-icon': true, 'icon-clicked': this.state.searchIconClicked })}
                                src="data:image/png;base64,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"></img>
                            }

                            { (window.location.hash === '#/search') && <img 
                                onClick = { () => this.handleIconClicked('search', '/search')}
                                className = {classNames({ 'search-icon': true, 'icon-clicked': this.state.searchIconClicked })}
                                src="data:image/png;base64,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"></img>
                            }
                   </div> 

                   <div 
                        className={classNames({ 'cart-link': true, 'current-link': window.location.hash === '#/ordercheckout' })}
                        // to='/ordercheckout'
                        > 
                        {/* <span  onClick = { () => this.handleIconClicked('cart', '/ordercheckout')}
                            className={classNames({ 'fas': true, 'fa-shopping-cart': true, 'icon-clicked': this.state.cartIconClicked })}
                            // className="fas fa-shopping-cart"
                            ></span> */}

                            { (window.location.hash !== '#/ordercheckout') && <img
                                onClick = { () => this.handleIconClicked('cart', '/ordercheckout') }  
                                className={classNames({ 'icon-clicked': this.state.cartIconClicked })} 
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEaUlEQVR4nO2bXWgcVRTHf2eyGw3xSZMqiilUEfFJaAv6UCFRMG23jRYNRQtt1pZAN9Logx8vMqAQFPQpEVZIgmhFNlIQkxSfKvjgR1N8UBAUCia1Gpu+SFJtNjvHh+zHuJnNzOx0Jt1Jfk/33j1zz8mf/8y9s3sDW2yxxRabGLF3PpwafmAFegzFsI9bgpWAz4/uH/gl2vLCJ2HvFJSzAju0KkgUCtAP3B9dadFguIeUuS+0KjaQ/zlAtNBtSeKwoK224VcjrilSxC1gbHK4fEekUwOu8Y1Gwj2kwvjkcKO54cpyInm2v7v/j1oBvhzQoOSBob79GVNE1vwtfh6CjUoSeGN8amTI6UO/Dnj7RlUVOiKC8ijonuJIoUl4qHov4+sZkE4NvHbDCowA0zSNjl1t08CTQFPB0qeAd+wxsb4FTNO0EKYrI3JPdUysBSjycKmhhqxZDWItQHYmm0TpKfUNKXxVHRNrAZrnVx4HbgdAmDu298XvqmNiLYCqPlvpkNtU+4DsTDYJFfsjTDjFxVaAov3vAECY69uX+d4pLrYC2O2vMOFkf4ipANX2N8RytD/EVIDkn8td2Ozv9PQvEUsBBMOT/SGGApjnzISiB0v99ewPMRTg3sX2LqC92L20nv0hhgIIts0Puq79IWYCmOfMBFJ5+qvKuvaHmAlQbf90KvOt2zWxEsCv/SFGAtRjf4iRANuvtXXi0/4QIwEs295f4DMv9oeYCJDL5ZpEpWJ/vNkfYiLAUutfXQjbit3fZ2eueLI/xEQAVXml1BaYME3T8nptwwswOjVyDPSJYldXkA/8XO/rh5GbiVzuvZbFluZBVN+yDY+fSGV+9jNPIAFqHakJF21VjAcXV3/yusv2wY/NhvWS39kCCVDrSE24CLAm4zeFwsrTR1KDf/udrbGfAcIcwqnZ1oXHTvQMztczRSAH1DhSEyoi8o9lWfNiyA+3LW2b6e3tLQSZL5AAfQdO/Qq8GWSOjcbLLVBWOJczm0OsZUPwIsBcqbHY0n5wvcBGxPWEyOjU8LuivFzsXgdOC4R/YlS4/Nv5hdN+dnX14PoMWLGSQ0nJPwN0ALcA6UiWPYXtu9sAPgozjest0H+gfwGMTgHH39bCRFVD19rTKpBOnbyoqo+MTo/sMZCdqN4ZdmGgP83OXP0k/DxbbG48n/1VVSnfAoCFXnhhX+Zrr1893Sw5qvEkwNjk+zsQ61OU3VVXn0eNw+nUyYtBC4kihxOuAmS/yLYlJX+B1WXQidm8Jneurhb1EUWOWrgugwkj/zqVwq4LMirIKKubIoCOpOQDnSCNIkctXAUQ5VCpraLP96Uyx/tSmeOoHCnHUImphyhy1MLLu8Ddpca/S8aXpbZat1batpg6iSKHI14EuFxqtLTQXb6w6Vq5LbaYOokihyOuO0EVzpRfhkQ/Hpsc3osgqjxXjoEzQYqIIkct6noZqvpKbrZpGcd/RvBKFDlqEehlaHXM6Dx6aOBqkCKiyFGLTb8T/A94e8JxjjTtVgAAAABJRU5ErkJggg=="></img>
                            }

                            { (window.location.hash === '#/ordercheckout') && <img
                                onClick = { () => this.handleIconClicked('cart', '/ordercheckout') }  
                                className={classNames({ 'icon-clicked': this.state.cartIconClicked })} 
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEdElEQVR4nO2bTWgcZRjHf8/shy1FtGmsotBDFRFREYKHWiJJmmg82JrUhaIeREo8lEWj4MdFBhSCQrBJyEUoHrQirtmghYZ0EwhIUWuLUAVBwUOjkdKmUA+GJLvzeHBns9nMZmd2OpPuJL/TPLPPvM+TP/9533l3J7DFFltssYmR8qDn2IH7DSN2yEKN8vMGYllW4evx0enfwm0veOLlgYgxoeheqUhSFDFirwD3hddaOBi1U2z03uDa2DhWO8CgWy2OiLDDPqfwVvhthUel29fQm+5S+zg7kquZ32jEa6es0JPuaig3GMgVjclE9vjk39VyPDmgQVlWGBgfyZnAmr/FwyTYsCQE3j2c7hpw+tCTAwQ+uJGdBYkKoqr7BGktniqoZT1Y+SzjaQ4YG8m9fcM6DAHTNI2L82dPA08BMRHjWeDD8pxI3wKmaVqKnLZjEe6pzIm0AAAi+mgpUF2zGkRagL6+lgTKITtWYaYyJ9ICXNl2+wGgqRjOZkemfqjMibQAqKTKoi/ZTM8BfX0tCUFK9hdDMk55kRWgaP9dxXB2bOjMOae8yApQbn+FDA72h4gKsMb+qKP9IaICzCd3dlBmf6fZ3yaSAqjhzv4QQQHazLY4ykE7Xs/+EEEBmucTHcAdxfDP9ewPERTAgpL9RXRd+0PEBGgz2+Kw8uxvFda3P0RMgEr7j49Of1/rmkgJ4NX+ECEB6rE/REiAnVeS7Xi0P0RIAMOgbOsrX+HC/hARAVKpVEzRkv0NwZX9ISIC5Hdf7wB2A6D89VDT467sDxERQAzeXAkkY5qm5fbahhegN931EmhnMVSNWR97ud7TDyM3E6n+fdsLhVtfQ/V9+5yin4wfn/rVyzi+BKj2Sk2QiLBD4IFCXlpB7yqdh58XSPR7Hc+XANVeqQkUtde38lVOvls2Cj0TQxP/eB2u0eeAWUVevbZr6YlvhqYv1zOAPwc4vFITNKq6oMhlIyY/GXO3nc9kMgU/4/kSYGw49zvwnp8xNho3t0BJ4ZSZSgbYy4bgRoBZ+6Awf/3geomNSM0JvCfdNSjwejFcVPQkSOBvjIow90jT/pNenurqoeYckE8uDySWEs8Be4BbBHk5yIZKKFy8dhbg0yDL1LwFTg3OXJW4tgOOv60FiVjutrS+anjJ7T32ZKsKLYbonYF1ZKP88nDz/s+DvgW22OzUdQsAiHIhO3rmW1x+9XQT1Vhd0E3S4f7OvZqXL4DHKj76UeJ6ZOyjqT/8NhJGDSdqCvDMG23NiaXEBf5fBp24tJxcbjk1OHO13ibCqFGNmstgfCnxDiuNLSKcQDgBLBbP7UksJXy9QRpGjWrUFECgt3Ss+kJ2OHc0O5w7CvJiWVqvw6WuCaNGNdzsBe4uJVv5Sfs4v33bpFNOnYRRwxE3AszZB4VYsts+jv270O2UUydh1HCk5l5AIbuyGdLPetKdT4uIoDxflpb100QYNapR32Zo9ap8SS3L8Z8R3BJGjWr43Qydk7i2j49Oz/tpIowa1dj0T4L/AdgLtWawyAYDAAAAAElFTkSuQmCC"></img>
                            }
                   </div> 
                </div>

                { currentOrder  && currentOrder.id && <span className="navbar-quantity"> 
                    {this.getLinesQuantity()}
                </span>}

                { showSearchBar && <div className="search-bar">
                    <input 
                        placeholder="search"
                        type="text"
                        />
                </div>}

                
                
            </div>
        )
   }
}


const mapStateToProps = state => ({
   currentOrder: state.orders.currentOrder,
   currentOrderLines: state.orders.currentOrderLines
 });
 
 const mapDispatchToProps = dispatch => ({
//    getAllProducts: () => dispatch(ProductActions.getAllProductsThunk()),
});
  
export default connect(mapStateToProps, null)(withRouter(NavBar));




