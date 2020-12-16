import React, { Component } from 'react'
import axios from 'axios'
import Axios from 'axios'
import Table from 'react-bootstrap/Table'

class ManageResto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            restname: "",
            Timings: "",
            Lastupdatedtime: "not updated",
            restdata: []
        }
    }

    edit = (r) => {
        console.log(r);
        this.setState({
            id: r.id,
            restname: r.restname,
            Timings: r.Timings,
            Lastupdatedtime: r.Lastupdatedtime,
            editFlag: true
        });
    }
    delete = (id) => {
        Axios.delete(`http://localhost:1337/resto/${this.state.id}`).then(res => console.log(res.data))
    }
    handler = (ev) => {
        this.setState({ [ev.target.name]: ev.target.value })
    }
    
    submit = (e) => {
        e.preventDefault();
var obj={restname:this.state.restname,Timings:this.state.Timings,Lastupdatedtime:this.state.Lastupdatedtime}

        if (this.state.editFlag) {
            Axios.put(`http://localhost:1337/resto/${this.state.id}`, obj)
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
        } else {
            console.log(this.state)
            Axios.post('http://localhost:1337/resto', obj).then(res => {
                console.log(res.data);
            }).catch(err => { console.log("error") })
        }

    }

    componentDidMount() {
        console.log("rest name>>",this.props.state);
        Axios.get('http://localhost:1337/resto').then(res => {
            console.log(res.data);
            this.setState({ restdata: res.data })

        }).catch(error => console.log("error"))

    
          
    }

    render() {
        return (
            <div>
                <form>
Restaurant Name:<input type='text' name="restoname" value={this.state.restname} onChange={this.handler} />
Timings:<input type='text' name="Timings" value={this.state.Timings} onChange={this.handler} />
Last Updated Time:<input type='text' name="Lastupdatedtime" value={this.state.Lastupdatedtime} onChange={this.handler} />
        <button onClick={this.submit}>Submit</button>
                </form>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Reastaurant Name</th>
                            <th>Timings</th>
                            <th>Last Updated Time </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.restdata.map(resto => (
						 <tr key={resto.id}>
						 <td>{resto.restname}</td>
                         <td>{resto.Timings}</td>
                         <td>{resto.Lastupdatedtime}</td>


						 <input  type="time"
                            id="time"
                            label="Opening Time"
                             type="time"
                            defaultValue="11:00"
                        
                        InputLabelProps={{
                           shrink: true,
                        }}
                          inputProps={{
                               step: 300, // 5 min
                           }}/>  
						    <div className="col-sm-1" style={{ marginTop: "15px" }}> </div>

                        
                            <td><button onClick={() => this.edit(resto)}>Edit</button></td>
                            <td><button onClick={() => this.delete(resto.id)}>Delete</button></td>

                            </tr>))}

                            
                    </tbody>
                    </Table>
            
                
            </div>
        )
    }
}
export default ManageResto