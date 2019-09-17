// 8-114 Rendering logic in the app
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
        this.setState({seenIndexes: seenIndexes.data});         // set this value in state (for HTML pushstate?)
    }

    // event handler for form submit
    handleSubmit =  async (event) => {    // a bound function https://reactjs.org/docs/handling-events.html
        event.preventDefault();     // form: don't submit yourself!

        await axios.post('/api/values', {       // POST an object to store (value is whatever user entered)
            index: this.state.index
        });
        this.setState({index: ''});     // reset state  
    };

    /// helper rendering method for indices (from Postgres table)
    renderSeenIndices()
    {
        return this.state.seenIndexes.map(({number}) => number.join(','));
        // pull out of the array only the 'number' property array and comma-separate its elements' contents
    }

    /// helper rendering method for indices (from Redis)
    renderValues()
    {
        const entries = [];

        for (let key in this.state.values)
        {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.values[key]}
                </div>
            );
        }
        // pull out of the array only the 'number' property array and comma-separate its elements' contents
        return entries;
    }


    render() {
        // need label, text input and assigned button
        return (
            // NB this is JSX https://reactjs.org/docs/introducing-jsx.html https://www.w3schools.com/react/react_jsx.asp
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter the index which to calculate:</label>
                    <input 
                        value={this.state.index}
                        onChange={event => this.setState({index: event.target.value})}/>
                    <button>Submit</button>
                </form>

                <h3>Indices I have seen:</h3>
                {this.renderSeenIndices()}

                <h3>Calculated Fibonacci sequence values:</h3>
                {this.renderValues()}
            </div>
        );
    }
}

// export this class for use elsewhere
export default Fib;