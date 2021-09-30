import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { useFirestore } from 'react-redux-firebase';
import * as authActions from '../../actions/authActions'
import * as contactActions from '../../actions/contactActions'
import * as educationActions from '../../actions/educationActions'
import * as documentActions from '../../actions/documentActions'
import './css/addResume.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    loader: {
        marginTop: "25%",
        marginLeft: "50%"
    }
})

function AddResume(props) {
    //console.log(props.auth);
    let classes = useStyles();
    const [resumeList, setResumeList] = useState([]);
    const firestore = useFirestore();
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(async () => {
        props.addEducation(null);
        props.addContact(null);
        props.addOldDocument(null, "");
        let user = await firestore.collection("users").doc(props.auth.uid).get();
        let userData = user.data();
        let ans = [];
        for (let key in userData.resumeIds) {
            let obj = { key, ...userData.resumeIds[key] };
            ans.push(obj);
        }
        setResumeList(ans)
        setLoading(false);
    }, [])

    const resumeHandler = event => {
        let id = event.target.id;
        let resumeObj = null;
        for (let i = 0; i < resumeList.length; i++) {
            let obj = resumeList[i];
            if (obj.key == id) {
                resumeObj = obj;
                break;
            }
        }

        props.addEducation(resumeObj.educationSection);
        props.addContact(resumeObj.contactSection);
        props.addOldDocument(resumeObj.document.id, resumeObj.document.skinCd);
        history.push("/getting-started");

    }

    const newResumeHandler = event => {
        history.push("/getting-started");
    }

    return (
        <>
            {!loading ?
                <div className="container">
                    <div className="prev-res">
                        <h1>Select previous resume</h1>
                        <div className="resume-container">
                            {resumeList.length != 0 ? resumeList.map((resume, index) => {
                                return (
                                    <button onClick={resumeHandler} id={resume.key} className="resume-button" >Resume {index+1}</button>
                                )
                            }) : <h2>No previous resume</h2>}
                        </div>

                    </div>
                    <div className="new-res">
                        <button onClick={newResumeHandler} id="new-resume-button">Add New Resume</button>
                    </div>
                </div> : <Box sx={{ display: 'flex' }}><CircularProgress className={classes.loader}/></Box>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addContact: (contact) => dispatch(contactActions.add(contact)),
        addEducation: (education) => dispatch(educationActions.add(education)),
        addOldDocument: (id, skin) => dispatch(documentActions.putPreviousDoc(id, skin)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddResume)
