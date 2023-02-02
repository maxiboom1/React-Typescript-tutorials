import { Component } from "react";
import "./ClockEx.css";

// create cc HomeArea/ClockEx --props --state

interface ClockExProps {
    format: string;
}

interface ClockExState {
    time: string;
}

// class ClockEx extends Component { // We don't have props, we don't have state
// class ClockEx extends Component<ClockExProps> { // We have props, we don't have state
// class ClockEx extends Component<{}, ClockExState> { // We don't have props, we have state
class ClockEx extends Component<ClockExProps, ClockExState> { // We have props and state

    private timerId: number; // Needed for closing the timer.

    public constructor(props: ClockExProps) {
        super(props);

        // Init our state - this is the only place we can assign value to the state: 
        this.state = { time: "" };

        // Never perform side-effects inside a cc constructor.
    }

    // Invoked once when component is connected and ready for use. 
    // Here we can perform side-effects:
    public componentDidMount(): void { // Mount - מחובר ומוכן לשימוש

        this.timerId = window.setInterval(() => {

            const now = new Date();

            const time = now.toLocaleTimeString("en", { hour12: this.props.format === "12h" });

            console.log(time);

            // Update state - will cause rendering of the component:
            this.setState({ time });

        }, 1000);

    }

    // Invoked once when component is about to be destroyed.
    // Here we can perform side-effects:
    public componentWillUnmount(): void {
        window.clearInterval(this.timerId);
    }

    // Returns the component's HTML:
    public render(): JSX.Element {
        return (
            <div className="ClockEx Box">
                <span>{this.state.time}</span>
            </div>
        );
    }
}

export default ClockEx;
