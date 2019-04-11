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

class Employee extends Component {
    constructor(props){
        super(props);
        this.state = {
            daily : '',
            total : ''
        }
    }
    componentDidMount(){
        if(!localStorage.getItem('isLog')){
            this.props.history.push('/')
        }
        else if(localStorage.getItem('isLog') && localStorage.getItem('type')==='manager'){
            this.props.history.push('/manager')
        }
        this.getTask().then(res => this.setState({daily : res.daily,total : res.total}));
    }
    getTask = async () => {
        var id = localStorage.getItem('id')
        let res = await axios.post('https://dailytaskxcidic.herokuapp.com/api/employee',{id : id});
        let data = await res.data;
        return data;
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
                        <li class="active">
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
                        <li>
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
                        Dashboard
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li class="active">Dashboard</li>
                    </ol>
                    </section>

                    <section class="content">
                    <div class="row">
                        <div class="col-lg-6 col-xs-6">
                        <div class="small-box bg-aqua">
                            <div class="inner">
                            <h3>{this.state.total}</h3>

                            <p>All Task</p>
                            </div>
                            <div class="icon">
                            <i class="ion ion-bag"></i>
                            </div>
                            <a href="/task" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                        </div>
                        <div class="col-lg-6 col-xs-6">
                        <div class="small-box bg-green">
                            <div class="inner">
                            <h3>{this.state.daily}</h3>

                            <p>Daily Task</p>
                            </div>
                            <div class="icon">
                            <i class="ion ion-bag"></i>
                            </div>
                            <a href="/task" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
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

export default Employee;
