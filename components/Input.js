
import { Form } from 'react-bootstrap'

const Input = (props) => {
    console.log('props', props);
    let label = props.label == undefined || props.label ? true : false;
    return (
        <>
            {label ? (
                <Form.Label htmlFor="inputPassword5">{props.label}</Form.Label>
            ) : null}
            <Form.Control
                {...props}
                type={props.text}
                id="text"
                aria-describedby="passwordHelpBlock"
            />

        </>
    )
}
export default Input