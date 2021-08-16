import React from 'react';
import {useSelector} from 'react-redux';
import { Modal, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    modal: {
        position: 'absolute',
        left: '50%',
        top: '40%',
        width: '400px',
        padding: '20px',
        textAlign: 'center',
        color: 'red',
        background: 'white',
        transform: 'translateX(-200px)'
    }
})

const ErrorModal = () => {
    const classes = useStyles();
    const error = useSelector(state => state.error);
    return (
        <Modal open={error}>
            <div className={classes.modal}>
                <h2>Ошибка загрузки</h2>
            </div>
        </Modal>
    )
}

export default ErrorModal;