import React, { Component } from 'react'
import TokenService from '../../services/token-service';

import AuthApiService from '../../services/auth-api-service'
import { Button, Input } from '../Utils/Utils'


 class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }


  // loginRedirect(){
  //   if(this.state.redirect===true)
  //   return (<Redirect to='/topics'/>)
  // }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { user_name, password } = ev.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        console.log("this is back where I need it ", res)
        user_name.value = ''
        password.value = ''
     //  TokenService.saveAuthToken(res.authToken)
        //this.setState({redirect:true})
      // console.log('redirect',this.state.redirect)
      // this.loginRedirect()
      
        this.props.onLoginSuccess()
        this.props.history.push('/topics');
      })
      
      .catch(res => {
        this.setState({ error: res.error })
      })
      
  }
  

  render() {
    const { error } = this.state
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <label htmlFor='LoginForm__user_name'>
            User name
          </label>
          <Input
            required
            name='user_name'
            id='LoginForm__user_name'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <Input
            required
            name='password'
            type='password'
            id='LoginForm__password'>
          </Input>
        </div>
        <Button type='submit'>
          Login
        </Button>
      </form>
    )
  }
}

export default LoginForm;