import React from 'react';
import {Link} from 'react-router-dom'

class LoginSessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
    }


componentWillMount(){
    this.props.zeroOutErrors();
}

  
update(field) {
    return e => this.setState({
        [field]: e.currentTarget.value
    })
}

//   handleDemo(e) {
//     let user = { username: 'sam330', password: '111222' }
//     e.preventDefault();
//     this.props.processForm(user)
//       .then(() => this.props.history.push('/'))
//   }


handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user)
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
            
            <form className="login-form" onSubmit={this.handleSubmit}>
            
                {this.props.errors.length > 0 && <div className="ErrorLogin">
                    {this.renderErrors()} 
                </div>  }

                <input type="text"
                    className="login-input"
                    onChange={this.update('username')}
                    value={this.state.username}
                    placeholder="Email address or username" 
                    // why the vlalue is like this??
                />

                <input type="password"
                    className="login-input"
                    onChange={this.update('password')}
                    value={this.state.password}
                    placeholder="Password"
                />
                
                <input type="submit" className="session-submit" value={this.props.formType} />

            </form>
            
        </div>
    )
  }

}

export default LoginSessionForm;