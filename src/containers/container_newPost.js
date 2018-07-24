import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import { createPost } from '../actions/action_createPost';

class NewPost extends Component{
    constructor(props){
        super(props)

        // this.state = {
        //     title:'',
        //     categories:'',
        //     content:''
        // }
    }

    //values is an object created by redux-from that contains the values of all out form inputs
    //notice we dont need to call event.preventDefault() because it is wrapped in the redux-form method called handleSubmit()
    //this.props.history is a special object passed down to our component by redux-form because we specified it as the component to be used in the <Route /> component in our main index.js file
    //when we call push on history with a specific route given as a string, it will route us to that address and render those associated components
    submitPost(values){

        this.props.createPost(values,() =>{
            this.props.history.push('/');
        });
       //console.log("submitting post", values);
    }

    //<input type="text" className="form-group"  placeholder="title" 
   // value={this.state.searchTerm}
    //onChange={this.onInputChange}/>

    //the ..field.input makes our input tag get all the properties of a redux form field state object.
    //when rendering a component though the redux-form <Field/> component, it automatically gets access to a property
    //called field, which is the auto generated state object for it.
    //we can also pass different attributes to the field object by providing like props to the parent field element
    //i.e. you dont have to bind onChange to the redux form state value field manually
    //the field.meta.touched is one of 3 lifecycle states of a form object incldued with redux-form. touched meaning a user has modifies a form input and then focused OUT of that particular form element
    //the three redux-form form element liecycle states are: pristine, touched, invalid
    renderField(field){
        //note we use nested destructing to pull off the touched and error property from field.meta.touched and field.meta.error
        const { name, description, label, meta:{touched, error} } = field;
        //conditional styling to make the text red when there is an error
        const ClassName=`form-group ${ touched && error ? "has-danger" : ""}`
        const formInputStyle =  touched && error ? {color:'red'} : {color:'black'};
        return(
            <div className={ClassName}>
                <label htmlFor={name}>{label}</label>
                <input type="text"  className="form-control" id={name} style={formInputStyle} aria-describedby={name} placeholder={description} 
                {...field.input}
                />
                <small id={`${field.name}Help`} className="text-help">
                    {touched ? error : ""}
                </small>
             </div>      
        );
    }


    //the field jx component is a redux-form component for rendering different types of form elements.
    //when rendering a component though the redux-form <Field/> component, it automatically gets access to a property
    //called field, which is the auto generated state object for it.
    //you can pass propeties onto the field object by adding values as props to the <field/> component
    //the handleSubmit function is a wrapper than runs the redux form validation and ensures it is valid before calling the onSubmit function
    //the Link component is form react-router-dom and it is used in place of traditional <a> </a> tags to ensure you dont ask the server for a new html document and just the data for the components instead.
    render(){
        const {handleSubmit} = this.props;
        return (
            <div className="container_newPost">
                <form onSubmit={ handleSubmit(this.submitPost.bind(this)) }> 
                    <Field
                        label="Post Title"
                        description="Enter your post title here"
                        name="title"
                        component={this.renderField}
                    />
                    <Field
                        label="Post Categories"
                        description="Enter your post categories each seperated by a comma here"
                        name="categories"
                        component={this.renderField}
                    />
                    <Field
                        label="Post Content"
                        description="Enter your post content here"
                        name="content"
                        component={this.renderField}
                    />
                
                <button className="btn btn-info">Submit Post</button>    
                <Link to="/" className="btn btn-danger">Cancel</Link>                   
                </form>
            </div>
        );
    }
}

//validate is a redux-form function that auto checks for errors on form components using the form state
//values is an object that contains all the different values a user has entered into a form
function validate(values){
    const errors = {}

    if (!values.title || values.title.length <= 5){
        errors.title="Please enter a title longer than 5 letters."
    }
    if (!values.categories){
        errors.categories="Please enter a category."
    }
    if (!values.content){
        errors.content="Please enter some content."
    }

    //if errors is returned with any properties, redux form assumes the form is invalid
    return errors;
}

//when using redux form, you use this and it will wrap your redux connect function
//the first arguement are things specific to redux-form, the second arguement (which you apply as a curried function arguement) is the redux connect function
//notice we need to include a form property unique string so that the form state in not shared with any other components,
//validate is a function we created that we specify redux-form to run so that it checks our form values for user errors
export default reduxForm({
    validate,
    form: 'PostsNewForm'
})( 
    connect(null,{createPost:createPost})(NewPost)
);

