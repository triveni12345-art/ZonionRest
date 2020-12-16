import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Axios from 'axios'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
class RestaurantDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: "",
            restname: "",
            address: "",
            ContactNo: "",
            Timings: "",
            restnameError: '',
            addError: '',
            contactError: '',
            editFlag: false,
            restdata: []
        }
    }
      edit = (t,evnt) => {
       evnt.preventDefault();
        this.setState
           
            ({
                id: t.id,
                restname: t.restname,
                address: t.address,
                ContactNo: t.ContactNo,
                Timings: t.Timings,
                editFlag: true


            });

    }
    delete = (id,ee) => {
    console.log(id);
        Axios.delete(`http://localhost:1337/rest/${id}`).then(res => console.log(res.data)).
        catch((err)=>console.log(err));
    }
    handler = (ev) => {
        ev.preventDefault()
        this.setState({ [ev.target.name]: ev.target.value })

    }
    onRestaurantDetails = () => {
        this.props.history.push('/RestaurantDetails')

    }
    
    add  (e)  {
        var obj = { restname: this.state.restname, 
            address: this.state.address, 
            ContactNo: this.state.ContactNo, 
            Timings: this.state.Timings 
        }

        if (this.state.editFlag) {
            console.log("in update==")
            Axios.put(`http://localhost:1337/rest/${this.state.id}`, obj)
                .then(res => {
                    console.log(res);

                    Axios.get('http://localhost:1337/rest').then(res => {
                        console.log(res.data);
                        this.setState({ restdata: res.data })
            
                    }).catch(error => console.log(error))

      }).catch(err => {
                    console.log(err);
                })
        } else {
            
                Axios.post('http://localhost:1337/rest', obj).then(res => {
                    console.log(res.data);
                }).catch(err => { console.log("error") })
            
               
             } 
             
}
    componentDidMount() {
        console.log('abc');
        Axios.get('http://localhost:1337/rest').then(res => {
            console.log(res.data);
            this.setState({ restdata: res.data })

        }).catch(error => console.log(error))
}


    render() {
        return (
            <div >
             <Link to='/'><button style={{float:"right"}} >Logout</button></Link>
            <form noValidate>
                <div>
            <label>Restaurant Name</label>
<input type='text'  name="restname"  value={this.state.restname} onChange={this.handler} /><br />
        <pre >{this.state.restnameError}</pre>
                </div>
                <div>
                <label>Address</label>
<input type='text' name="address" value={this.state.address} onChange={this.handler} /><br />
                </div>
Contact No:<input type='text' name="ContactNo" value={this.state.ContactNo} onChange={this.handler} /><br />
Timings:<input type='text' name="Timings" value={this.state.Timings} onChange={this.handler} />

                <button onClick={(e)=>this.add(e)}>Add Restaurants</button>
                   
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Restaurant Name</th>
                            <th>Address</th>
                            <th>Contact Number</th>
                            <th colSpan="2">Timings</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.restdata.map(rest => (
                            <tr key={rest.id}>
                                <td>{rest.restname}</td>
                                <td>{rest.address}</td>
                                <td>{rest.ContactNo}</td>
                                <td>{rest.Timings}</td>

                                <td>
                                <input type="time"
                                    id="time"
                                    label="Opening Time"
                                    type="time"
                                    defaultValue="11:00"/>
                                    </td>
             <td><button onClick={ (e)=>this.edit(rest,e)}>Edit</button></td>
            <td><button onClick={ (e)=>this.delete(rest.id,e)}>Delete</button></td>
                            </tr>))}
                    </tbody>
                    <tbody>
                        <tr>
                          </tr>
                    </tbody>
                    </Table>
                </form>
                </div>
             


        )
    }
}


export default RestaurantDetails;