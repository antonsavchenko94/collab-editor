import React from 'react';
import { Jumbotron } from 'react-bootstrap';

//import Editor from 'react-medium-editor';
//import 'medium-editor/dist/css/medium-editor.css';
//import 'medium-editor/dist/css/themes/default.css';
import 'react-trumbowyg/dist/trumbowyg.min.css'
import Trumbowyg from 'react-trumbowyg'

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.createDoc = this.createDoc.bind(this);
		this.state = { text: 'Fusce dapibus, tellus ac cursus commodo' };
	}
	handleChange(text, medium) {
		console.log(event.target.innerText)
    Meteor.call('updateText', event.target.innerText, this.props.thisDocument._id)
  	}
  	createDoc(text, medium) {
    Meteor.call('createDoc', text);
  	}
  	shouldComponentUpdate(nextProps, nextState) {
    // You can access `this.props` and `this.state` here
    // This function should return a boolean, whether the component should re-render.
    return false;
  	}
	render() {
		const { thisDocument } = this.props;
		return <div className="Index">
		<button onClick={this.createDoc}>click me</button>
			        <h3>Editor #2</h3>
			        {/*<Trumbowyg id='react-trumbowyg'/>*/}
			        <Trumbowyg
			        	id='react-trumbowyg'
				        buttons={
				            [
				                ['formatting'],
				                'btnGrp-semantic',
				                ['link'],
				                ['insertImage'],
				                'btnGrp-justify',
				                'btnGrp-lists',
				                ['fullscreen']
				            ]
				        }
				        data={thisDocument.body}
				        placeholder='Type your text!'
				        onChange={this.handleChange} 
				    />
			        {/*<Editor
			          text={thisDocument.body}
			          onChange={this.handleChange}
			          options={{toolbar: {buttons: ['bold', 'italic', 'underline']}}}
			        />*/}
			  </div>
	}
} 

export default Index;
