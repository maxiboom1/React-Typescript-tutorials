import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SendIcon from '@mui/icons-material/Send';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "./ContactUs.css";

function ContactUs(): JSX.Element {
    return (
        <div className="ContactUs Box">

            <Typography variant="h3">
                <ContactMailIcon fontSize="large" />
                &nbsp;
                Contact Us
            </Typography>

            <form>

                <TextField label="Full name:" variant="outlined" className="InputBox" />

                <TextField label="Email:" variant="outlined" type="email" className="InputBox" />

                <TextField label="Message:" variant="outlined" className="InputBox" />

                <div className="Left">
                    <FormControlLabel label="Send me promotional emails" control={<Checkbox />} />
                </div>

                <ButtonGroup fullWidth variant="contained">
                    <Button color="primary">Send &nbsp; <SendIcon /> </Button>
                    <Button color="secondary" type="reset">Clear &nbsp; <HighlightOffIcon /> </Button>
                </ButtonGroup>

            </form>

        </div>
    );
}

export default ContactUs;
