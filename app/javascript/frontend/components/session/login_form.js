import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { loginReduxAjax, clearErrors } from '../../actions/session_actions';

class LoginSessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // username: "",
            email: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

componentWillMount(){
    // this.props.zeroOutErrors();
}
  
update(field) {
    return e => this.setState({
        [field]: e.currentTarget.value
    })
}

handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.handleLogin(user)
        .then(() => this.props.history.push('/'));
    //() => this.props.history.push('/')
    //Why when logout, current user is still there in state??
}


renderErrors() {
    const { errors } = this.props;
    return (
        <ul>
        {errors.map((error, i) => (
            <p key={`error-${i}`}>
            {error}
            </p>
        ))}
        </ul>
    );
}


render() {
    window.loginState = this.state;

    return (
        <div className="login-page-container">
            {/*         
            <div className="header-login"> 
            <Link to="/" className="header-logoo">
                <img id='logo-login-header' src='https://community.spotify.com/t5/image/serverpage/image-id/28936i76F1ECE491E76C35/image-size/small?v=mpbl-1&px=-1' />
                <span className="header-logo-login" > Kalify  </span>  </Link>
            </div> */}

            {/* 
            <div className="divider"> 
                <span className="divider-line">  </span>
                <div className="or-divider">
                <strong className="or-divider-title"> OR </strong>
                </div>
                <span className="divider-line"> </span>
                <br />
            </div> */}
            
            <form className="login-form">
                {/* {this.props.errors.length > 0 && <div className="ErrorLogin">
                    {this.renderErrors()} 
                </div>  } */}

                <input type="text"
                    className="login-input"
                    onChange={this.update('email')}
                    value={this.state.email}
                    placeholder="Email address or email" 
                />

                <input type="password"
                    className="login-input"
                    onChange={this.update('password')}
                    value={this.state.password}
                    placeholder="Password"
                />
                
                <button 
                    className="session-submit"
                    onClick = {this.handleSubmit}
                > submit </button>

            </form>
        </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => ({
    // errors: state.errors.session,
    // formType: 'login',
    // navLink: <Link to="/signup">sign up</Link>
  
  });
  
  const mapDispatchToProps = (dispatch, ownProps) => ({
    handleLogin: (user) => dispatch(loginReduxAjax(user)),
    clearErrors: () => dispatch(clearErrors())
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginSessionForm);