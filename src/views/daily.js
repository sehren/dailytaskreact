import React, { Component } from 'react';
import '../style/login.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class Daily extends Component {
    constructor(props) {
        super(props)
        this.state = {
            task : ''
        }
    }
    componentDidMount(){
        if(!localStorage.getItem('isLog')){
            this.props.history.push('/')
        }
        else if(localStorage.getItem('isLog') && localStorage.getItem('type')==='employee'){
            this.props.history.push('/employee')
        }
        this.getTask().then(res => this.setState({task : res.task}));
    }
    getTask = async () => {
        let res = await axios.get('/api/daily');
        let data = await res.data;
        for(let i=0;i<data.task.length;i++){
            let date = new Date(data.task[i].date)
            data.task[i].date = date.toLocaleTimeString()
        }
        return data;
    }
    logout=()=>{
        localStorage.clear();
        this.props.history.push('/')
    }
    render() {
        let data = []
        if(this.state.task[0] !== undefined){
            data = this.state.task.map((i,key)=>{
                return  <tr>
                            <td>{key+1}</td>
                            <td>{i.task}</td>
                            <td>{i.name}</td>
                            <td><span class="badge bg-red">{i.date}</span></td>
                        </tr>
            })
        }
        const widthNumb = {
            width: '10px'
        };
        const widthDate = {
            width : '40px'
        }
        return(
            <div class="hold-transition skin-blue sidebar-mini">

                <header class="main-header">
                    <a href="index2.html" class="logo">
                    <span class="logo-mini">MGR</span>
                    <span class="logo-lg"><b>Manager</b> Page</span>
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
                        <a href="/manager">
                            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
                        </a>
                        </li>
                        <li>
                        <a href="/total">
                            <i class="fa fa-tasks"></i> <span>All Task</span>
                        </a>
                        </li>
                        <li class="active">
                        <a href="/daily">
                            <i class="fa fa-clock-o"></i> <span>Daily Task</span>
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
                        Daily Task
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li class="active">Daily Task</li>
                    </ol>
                    </section>

                    <section class="content">
                    <div class="row">
                        <section class="col-lg-12 connectedSortable">
                        <div class="box box-primary">
                            <div class="box-header with-border">
                            <h3 class="box-title">Task List</h3>
                            </div>
                            <div class="box-body">
                            <table class="table table-bordered">
                                <tr>
                                    <th style={widthNumb}>#</th>
                                    <th>Task</th>
                                    <th>Employee Name</th>
                                    <th style={widthDate}>Time</th>
                                </tr>
                                {data}
                            </table>
                            </div>
                        </div>
                        </section>
                    </div>
                    </section>
                </div>
                <div class="control-sidebar-bg"></div>
            </div>
        );
    }
}

export default withRouter(Daily);
