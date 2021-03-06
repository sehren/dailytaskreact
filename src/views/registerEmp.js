import React, { Component } from 'react';
import '../style/login.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email : '',
            password : '',
            name : '',
            address : ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        if(localStorage.getItem('isLog')){
            if(localStorage.getItem('type')==='employee'){
                this.props.history.push('/employee')
            }
            else if(localStorage.getItem('type')==='manager'){
                this.props.history.push('/manager')
            }
        }
    }
    handleChange(event) {
        this.setState({[event.target.name]:event.target.value})
    }
    register = (ev) => {
        ev.preventDefault();
        let self = this
        const data = {
            email : this.state.email,
            password : this.state.password,
            name : this.state.name,
            address : this.state.address
        }
        axios.post('https://dailytaskxcidic.herokuapp.com/api/register/employee',data).then((res)=>{
            if(res.data.isReg){
                localStorage.setItem('isLog',true)
                localStorage.setItem('type','employee')
                localStorage.setItem('id',res.data.id)
                self.props.history.push('/employee');
            }
            else{
                self.state.error = res.data.err
                alert(self.state.error)
            }
        })
    }
    render() {
        return (
        <div class="container login-container">
            <div class="row">
                <div class="col-md-6 mx-auto registerForm">
                    <h3>Register Employee</h3>
                    <form onSubmit={this.register}>
                        <div class="form-group">
                            <input type="email" class="form-control" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" name="address" placeholder="Address" value={this.state.address} onChange={this.handleChange} required/>
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btnSubmit" value="register" />
                        </div>
                        <div class="form-group">
                            <a href="/">login</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default withRouter(Home);
