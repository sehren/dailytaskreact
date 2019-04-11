import React, { Component } from 'react';
import '../style/login.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailEmployee :'',
            passwordEmployee : '',
            emailManager : '',
            passwordManager : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.employeeSubmit = this.employeeSubmit.bind(this);
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
    employeeSubmit = (event) =>{
        event.preventDefault();
        const employee = {
            email : this.state.emailEmployee,
            password : this.state.passwordEmployee
        }
        var self = this
        axios.post('/api/login/employee',employee).then(function(res){
            if(res.data.isLog){
                localStorage.setItem('isLog',true)
                localStorage.setItem('type','employee')
                localStorage.setItem('id',res.data.id)
                self.props.history.push('/employee');
            }
            else{
                self.state.error = res.data.err
                alert(self.state.error)
            }
        }).catch(function (error) {
            alert(error);
        });
    }
    managerSubmit = (event)=>{
        event.preventDefault();
        const manager = {
            email : this.state.emailManager,
            password : this.state.passwordManager
        }
        var self = this
        axios.post('/api/login/manager',manager).then(function(res){
            if(res.data.isLog){
                localStorage.setItem('isLog',true)
                localStorage.setItem('type','manager')
                localStorage.setItem('data',res.data.data)
                self.props.history.push('/manager');
            }
            else{
                self.state.error = res.data.err
                alert(self.state.error)
            }
        }).catch(function (error) {
            alert(error);
        });
    }
    render() {
        return (
        <div class="container login-container">
            <div class="row">
                <div class="col-md-6 login-form-1">
                    <h3>Employee</h3>
                    <form onSubmit={this.employeeSubmit}>
                        <div class="form-group">
                            <input type="email" class="form-control" name="emailEmployee" placeholder="Email" value={this.state.emailEmployee} onChange={this.handleChange} required/>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" name="passwordEmployee" placeholder="Password" value={this.state.passwordEmployee} onChange={this.handleChange} required/>
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btnSubmit" value="Login" />
                        </div>
                        <div class="form-group">
                            <a href="/register/employee" class="register">Register</a>
                        </div>
                    </form>
                </div>
                <div class="col-md-6 login-form-2">
                <h3>Manager</h3>
                <form onSubmit={this.managerSubmit}>
                    <div class="form-group">
                        <input type="text" class="form-control" name="emailManager" placeholder="Email" value={this.state.emailManager} onChange={this.handleChange}/>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" name="passwordManager" placeholder="Password" value={this.state.passwordManager} onChange={this.handleChange}/>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btnSubmit" value="Login" />
                    </div>
                    <div class="form-group">
                        <a href="/register/manager" class="register">Register</a>
                    </div>
                </form>
            </div>
            </div>
        </div>
        );
    }
}

export default withRouter(Home);
