import React, {Component} from 'react';
import axios from 'axios';          // axios to do with requests

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {};
        index: ''
    };

    // on loading, fetch data from API (ie from Postgres & Redis)
    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    // implementation of method to fetch all previously computed fibonacci values
    async fetchValues() 
    {
        const values = await axios.get('/api/values/current');  // get computed values from API
        this.setState({values: values.data});
    }

    // implementation of method to fetch all previously submitted fibonacci indices
    async fetchIndexes()
    {
        const seenIndexes = await axios.get('/api/values/all'); // get all user-submitted indices from API
        this.setState({seenIndexes: seenIndexes.data});
    }

}