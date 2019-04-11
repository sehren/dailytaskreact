import React, { Component } from 'react';
import '../style/login.css';
import '../bower_components/font-awesome/css/font-awesome.min.css';
import '../bower_components/Ionicons/css/ionicons.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../style/AdminLTE.min.css';
import '../dist/css/skins/_all-skins.min.css'
import '../bower_components/morris.js/morris.css';
import '../bower_components/jvectormap/jquery-jvectormap.css';
import '../bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import '../bower_components/bootstrap-daterangepicker/daterangepicker.css';
import '../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css';
import axios from 'axios';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : '',
            address : ''
        }
        this.onchange = this.onchange.bind(this)
    }
    componentDidMount(){
        if(!localStorage.getItem('isLog')){
            this.props.history.push('/')
        }
        else if(localStorage.getItem('isLog') && localStorage.getItem('type')==='manager'){
            this.props.history.push('/manager')
        }
        this.getProfile().then(res => this.setState({name : res.name,address : res.address}));
    }
    onchange(ev){
        this.setState({[ev.target.name] : ev.target.value});
    }
    getProfile = async () => {
        var id = localStorage.getItem('id')
        let res = await axios.post('/api/profile',{id : id});
        let data = await res.data;
        return data;
    }
    editProfile=(event)=>{
        event.preventDefault();
        let self = this
        axios.post('/api/editProfile',{
            name : self.state.name,
            address : self.state.address,
            id : localStorage.getItem('id')})
            .then((res)=>{
            window.location.reload();
        })
    }
    logout=()=>{
        localStorage.clear();
        this.props.history.push('/')
    }
    render() {
        return (
            <div class="hold-transition skin-green sidebar-mini">

                <header class="main-header">
                    <a href="index2.html" class="logo">
                    <span class="logo-mini">EMP</span>
                    <span class="logo-lg"><b>Employee</b> Page</span>
                    </a>
                    <nav class="navbar navbar-static-top">
                    <a href="" data-toggle="push-menu" role="button">
                        <span class="sr-only">Toggle navigation</span>
                    </a>

                    </nav>
                </header>
                <aside class="main-sidebar">
                    <section class="sidebar">
                    <ul class="sidebar-menu" data-widget="tree">
                        <li>
                        <a href="/employee">
                            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
                            <span class="pull-right-container">
                            </span>
                        </a>
                        </li>
                        <li>
                        <a href="/task">
                            <i class="fa fa-tasks"></i> <span>task</span>
                        </a>
                        </li>
                        <li class="active">
                            <a href="/profile">
                            <i class="fa fa-user"></i> <span>profile</span>
                            </a>
                        </li>
                        <li>
                        <a href="" onClick={this.logout}>
                            <i class="fa fa-sign-out"></i> <span>Logout</span>
                            <span class="pull-right-container">
                            </span>
                        </a>
                        </li>
                    </ul>
                    </section>
                </aside>

                <div class="content-wrapper">
                    <section class="content-header">
                    <h1>
                        Profile
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li class="active">Profile</li>
                    </ol>
                    </section>

                    <section class="content">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="box box-primary">
                                <div class="box-header with-border">
                                    <h3 class="box-title">Edit Profile</h3>
                                </div>
                                <form onSubmit={this.editProfile}>
                                    <div class="box-body">
                                        <div class="row">
                                            <div class="form-group col-md-6">
                                                <label for="exampleInputEmail1">Name</label>
                                                <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onchange}/>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="exampleInputPassword1">Address</label>
                                                <input type="text" class="form-control" name="address" value={this.state.address} onChange={this.onchange}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="box-footer">
                                    <input type="submit" class="btn btn-primary" value="edit"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                
                    </section>
                </div>
                <div class="control-sidebar-bg"></div>
            </div>
        );
    }
}

export default Profile;
