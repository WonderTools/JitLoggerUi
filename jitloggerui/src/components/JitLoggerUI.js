import React, { Component } from 'react';
import '../css/JitLoggerUI.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import SortableTbl from './SortableTbl'
import connector from './HttpConnector'

const col = [
    "ModuleName",
    "LogId",
    "LogLevel",
    "DateTime",
    "EventId.Id",
    "EventId.Name",
    "LogMessage"   
];
const tHead = [
    "Module Name",
    "Log Id",
    "Log Level",
    "DateTime",
    "Event Id",
    "Event Name",
    "Log Message"   	
];
class JitLogegrUi extends Component {

  constructor(props) {
    super(props);
    this.state = {
        logs:[],
        loading:true,
        filter: {
            logic: "and",
            filters: []
        }
          
    };   
}

componentDidMount=()=> {
    
    let baseUrl = window.location.href;
    this.baseUrl = baseUrl.replace("ui","logs")

    console.log("url base",baseUrl)
   // const url = this.baseUrl+'logs'; // to be used before check-in to make it work for the application where it is installed
    const url = 'http://localhost:9609/jit-logger/logs';
   // console.log("Base url check",url)
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState(
          { 
              logs:data,loading:false,
              
             }));

    //connector.get(url).then(response => {               
    //    this.setState(
    //        {
    //            logs:response,loading:false,
    //        });                
    //}); 
  }
   
  

    render() {
        var Modifiedlogs;
        if(!this.state.loading)
        {            
            const moduleName = this.state.logs.Name;
            this.Modifiedlogs= this.state.logs.Logs.map(x=>
            {
                x.ModuleName = moduleName;
                return x;
            })  
            console.log("Modified log",this.Modifiedlogs)         
        }
      
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            :              
            
            <SortableTbl tblData={this.Modifiedlogs}
			tHead={tHead}			
			dKey={col}
			search={true}
			defaultCSS={true}/>          
        return (
            contents
        );
    }
  }
  
  export default JitLogegrUi;