import React from 'react';
import ReactQuill from 'react-quill';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.createDoc = this.createDoc.bind(this);
		this.state = { text: 'Fusce dapibus, tellus ac cursus commodo' };
	}
	handleChange(text) {
    	Meteor.call('updateText', text, this.props.thisDocument._id)
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
				    	value={thisDocument && thisDocument.body ? thisDocument.body : ''}
						onChange={this.handleChange}
				    />
			  </div>)
	}
} 

export default Index;
