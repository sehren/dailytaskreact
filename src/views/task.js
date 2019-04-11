import React, { Component } from 'react';
import '../style/login.css';
import '../bower_components/font-awesome/css/font-awesome.min.css';
import '../bower_components/Ionicons/css/ionicons.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../style/AdminLTE.min.css';
import '../dist/css/skins/_all-skins.min.css'
import '../bower_components/morris.js/morris.css';
import '../bower_components/jvectormap/jquery-jvectormap.css';
import '../bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import '../bower_components/bootstrap-daterangepicker/daterangepicker.css';
import '../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css';
import axios from 'axios';
import $ from 'jquery';

class Task extends Component {
    constructor(props){
        super(props);
        this.state = {
            task : '',
            addTask : '',
            editTask : false
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
        this.getTask().then(res => this.setState({task : res.task}));
    }
    getTask = async () => {
        var id = localStorage.getItem('id')
        let res = await axios.post('/api/task',{id : id});
        let data = await res.data;
        for(let i=0;i<data.task.length;i++){
            let date = new Date(data.task[i].date)
            data.task[i].date = date.toLocaleString()
        }
        return data;
    }
    delete(id){
        axios.post('/api/delete',{id : id}).then((res)=>{
            window.location.reload();
        })
    }
    onchange(ev){
        this.setState({[ev.target.name] : ev.target.value});
    }
    tambahTask = (event)=>{
        event.preventDefault();
        var id = localStorage.getItem('id')
        if(!this.state.editTask)
            axios.post('/api/addTask',{id :id,task : this.state.addTask}).then((res)=>{
                window.location.reload();
            })
        else
            axios.post('/api/editTask',{id :this.state.idTask,task : this.state.addTask}).then((res)=>{
                window.location.reload();
            })
    }
    edit(id){
        for(let i=0;i<this.state.task.length;i++){
            if(id===this.state.task[i].id){
                this.setState({addTask : this.state.task[i].task,idTask : id,editTask : true})
            }
        }
    }
    logout=()=>{
        localStorage.clear();
        this.props.history.push('/')
    }
    render() {
        let data = []
        if(this.state.task[0] !== undefined){
            data = this.state.task.map((i,key)=>{
                return <li key={i.id}>
                    <span class="badge badge-secondary"><i class="fa fa-clock-o"> {i.date}</i></span>
                    <span class="text">{i.task} </span>
                    <div class="tools">
                        <i onClick={this.edit.bind(this,i.id)} class="fa fa-edit"></i>
                        <i onClick={this.delete.bind(this,i.id)} class="fa fa-trash-o"></i>
                    </div>
                </li>
            })
        }
        return (
            <div class="hold-transition skin-green sidebar-mini">

                <header class="main-header">
                    <a href="index2.html" class="logo">
                    <span class="logo-mini">EMP</span>
                    <span class="logo-lg"><b>Employee</b> Page</span>
                    </a>
                    <nav class="navbar navbar-static-top">
                    <a href="#" data-toggle="push-menu" role="button">
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
                        <li class="active">
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
                        Task
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li class="active">Task</li>
                    </ol>
                    </section>

                    <section class="content">
                        <div class="row">
                            <section class="col-lg-12 connectedSortable">
                                <div class="box box-primary">
                                    <div class="box-header">
                                        <i class="ion ion-clipboard"></i>
                                        <h3 class="box-title">Task List</h3>
                                    </div>
                                    <div class="box-body">
                                        <ul class="todo-list">
                                        {data}
                                        </ul>
                                    </div>
                                    <div class="box-footer clearfix no-border">
                                        <form onSubmit={this.tambahTask}>
                                            <div class="row">
                                                <div class="form-group col-md-11">
                                                    <input type="text" class="form-control" name="addTask" value={this.state.addTask} onChange={this.onchange} placeholder="Type Some Task.." required/>
                                                </div>
                                                <div class="form-group">
                                                    <input type="submit" class="btn btn-primary" value="Submit"/>
                                                </div>
                                            </div> 
                                        </form>
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

export default Task;
