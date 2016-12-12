import React from 'react';
import ReactQuill from 'react-quill';
import {debounce} from 'throttle-debounce';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.createDoc = this.createDoc.bind(this);
		this.state = { text: 'Fusce dapibus, tellus ac cursus commodo' };
		this.saveText = debounce(900, this.saveText);
	}
	saveText(value){
	    console.log('saveText ran');
	    Meteor.call('updateText', value, this.props.thisDocument._id, function(error, response){
	      if (error) { console.log(error); return; }
	    });
	 }
	handleChange(text) {
		console.log(text);
		this.saveText(text);
  	}
	componentWillReceiveProps() {
		this.refs.editor.blur();

	}
	createDoc() {
    	Meteor.call('createDoc');
  	}

	render() {
		const { thisDocument } = this.props;

		return (<div className="Index">
		{!thisDocument && <button onClick={this.createDoc}>create a doc</button>}
		
			        <h3>Editor #2</h3>	
				    <ReactQuill
				    	ref="editor"
				    	value={thisDocument && thisDocument.body ? thisDocument.body : ''}
						onChange={this.handleChange}
				    />
			  </div>)
	}
} 

export default Index;