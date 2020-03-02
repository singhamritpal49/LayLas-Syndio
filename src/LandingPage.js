import React, { Component } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
// import { Card } from 'sem'
const API = "https://data.cityofnewyork.us/resource/k397-673e.json"



export default class LandingPage extends Component {
    state = {
        employees: []
    }

componentDidMount() {
    fetch(API)
    .then(res => res.json())
    .then(data => {
        this.setState({
            employees: data
        })
    })
}




    render() {

        
        console.log(this.state.employees)
        const filteredEmps = this.state.employees.filter(employee => {
            return employee.title_description === "DIRECTOR OF FIELD OPERATIONS" 
        })
        const empCard = filteredEmps.slice(0, 3).map(emp => {
        return    <Card>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://i1.wp.com/listwisegroup.com/wp-content/uploads/2019/01/avatar-1577909_960_720.png?fit=720%2C720&ssl=1'
                />
                <Card.Header>{emp.title_description}</Card.Header>
                <Card.Meta>{emp.agency_name}</Card.Meta>
                <Card.Description>
                    {2020 -   parseInt(emp.agency_start_date.slice(0,4))} Years in this position
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                <Button basic color='green'>
                    Connect
                </Button>
                </div>
            </Card.Content>
            </Card>
         })
         console.log(filteredEmps)
         const salaries = filteredEmps.map(emp => {
             return parseInt(emp.base_salary)
         })

         const minSal = Math.min(...salaries)
         const maxSal = Math.max(...salaries)
         console.log('maxSal', maxSal)
        console.log(salaries)
        
        return (
            
            <div>    
            <h1>The salary range for this position is ${minSal} - ${maxSal}</h1>
                <li className='emp-card' styles={{display: 'flex', textAlign: 'center'}}>{empCard}</li>
            </div>
        )
    }
}
