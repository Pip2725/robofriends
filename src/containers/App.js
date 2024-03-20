import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
//import { Robots } from './Robots';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';


function App() {
    const [Robots, setRobots] = useState([])
    const [searchfield, setSearchfield] = useState('')

    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json())
            .then(users => {setRobots(users)});
    },[])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const filteredRobots = Robots.filter(Robot =>{
        return Robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    return !Robots.length ?
    <h1>Loading</h1> :
    (
        <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                <ErrorBoundry>
                    <CardList Robots = {filteredRobots} />
                </ErrorBoundry>
            </Scroll>
        </div>
    );
}


export default App;