import { Injectable } from "@angular/core";
import { Notyf } from "notyf";

@Injectable({
    providedIn: "root"
})
export class NotifyService {

    private notyf = new Notyf({
        duration: 3000,
        position: { x: "center", y: "top" }
    });

    public success(message: string): void {
        this.notyf.success(message);
    }

    public error(err: any): void {
        const message = this.extractErrorMessage(err);
        this.notyf.error(message);
    }

    private extractErrorMessage(err: any): string {

        // If error is the message string: 
        if (typeof err === "string") return err;

        // If error thrown by axios:
        if (err.response?.data) return err.response.data;

        // If error thrown by TypeScript/JavaScript:
        if(typeof err.message === "string") return err.message;

        // Unknown error (JIC = Just in Case)
        return "Some error, please try again";
    }

}
