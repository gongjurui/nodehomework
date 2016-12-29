let Board = React.createClass({
    getInitialState(){
        return {val:'',words:[]}
    },

    handleClick(event){
        this.refs.myTes.focus();
        this.state.words.push(this.refs.myTes.value);
        this.setState({words:this.state.words,val:this.refs.myTes.value});
        this.refs.myTes.value = '';

    },
    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1>珠峰留言版</h1>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {
                            this.state.words.map(function(item,index){
                                return  <li key={index} className="list-group-item">{item}</li>
                            })

                        }

                    </ul>
                </div>
                <div className="panel-footer">
                    <input type="text" className="form-control"  ref="myTes"/>
                    <button className="btn btn-primary" onClick={this.handleClick}>留言</button>
                </div>
            </div>
        )
    }
});
ReactDOM.render(<Board/>,document.querySelector('#app'));