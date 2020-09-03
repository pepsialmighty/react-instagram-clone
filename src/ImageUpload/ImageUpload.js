import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";
import { storage, db } from "../firebase";
import firebase from "firebase";

import "./ImageUpload.css";

///MODAL MUI STYLING
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

///IMGAEUPLOAD
const ImageUpload = (props) => {
  const { username } = props;

  const classes = useStyles();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption,
              imageUrl: url,
              username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className='imageupload'>
      <progress className='imageupload__progress' value={progress} max='100' />
      <input
        type='text'
        placeholder='Enter a caption...'
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
        className='imageupload__input'
      />
      <input
        type='file'
        onChange={handleChange}
        className='imageupload__searchfile'
      />

      <ColorButton
        onClick={handleUpload}
        variant='contained'
        color='primary'
        className={classes.margin}
      >
        Upload
      </ColorButton>
    </div>
  );
};

export default ImageUpload;
