import React from 'react';
import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import 'react-trumbowyg/dist/trumbowyg.min.css';
import Trumbowyg from 'react-trumbowyg';
import ReactSummernote from 'react-summernote';
import '../../../node_modules/react-summernote/dist/react-summernote.css'; // import styles 
import '../../../node_modules/bootstrap/js/modal';
import '../../../node_modules/bootstrap/js/dropdown';
import '../../../node_modules/bootstrap/js/tooltip';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.createDoc = this.createDoc.bind(this);
		this.state = { text: 'Fusce dapibus, tellus ac cursus commodo' };
	}
	handleChange(text, medium) {
    	Meteor.call('updateText', text.target.innerHTML, this.props.thisDocument._id)
  	}
  	createDoc() {

    	Meteor.call('createDoc');
  	}
	render() {
		const { thisDocument } = this.props;
		return <div className="Index">
		{!thisDocument && <button onClick={this.createDoc}>create a doc</button>}
		
			        <h3>Editor #2</h3>
			        {/*<Trumbowyg id='react-trumbowyg'/>*/}
			       {thisDocument && thisDocument.title 
			       	? <Trumbowyg
			        	id='react-trumbowyg'
				        buttons={
				            [['formatting'], 'btnGrp-semantic', ['link'], ['insertImage'],
				                'btnGrp-justify',
				                'btnGrp-lists',
				                ['fullscreen']
				            ]
				        }
				        data={thisDocument && thisDocument.body ? thisDocument.body : ''}
				        placeholder='Type your text!'
				        onChange={this.handleChange} 
				    />: null}
				    {/*<ReactSummernote
					    value={thisDocument.body}
					    options={{
					      height: 350,
					      dialogsInBody: true,
				          toolbar: [
				            ['style', ['style']],
				            ['font', ['bold', 'underline', 'clear']],
				            ['fontname', ['fontname']],
				            ['para', ['ul', 'ol', 'paragraph']],
				            ['table', ['table']],
				            ['insert', ['link', 'picture', 'video']],
				            ['view', ['fullscreen', 'codeview']]
				          ]
				        }}
					    onChange={this.handleChange}
					  />*/}
			        {/*<Editor
			          text={thisDocument.body}
			          onChange={this.handleChange}
			          options={{toolbar: {buttons: ['bold', 'italic', 'underline']}}}
			        />*/}
			  </div>
	}
} 

export default Index;
