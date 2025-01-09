import { Injectable } from "@angular/core";
import { ShareData } from "./shareservice.service";

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    /**
     * Constructor
     */
    constructor(private shareData: ShareData) { }

    showSuccessMessage(strTitle: any, strMess: any) {
        let alert = {
            type: 'success',
            title: strTitle,
            message: strMess
        }
        this.shareData.sendMessage('alert', alert);
    }

    showErrorMessage(strTitle: any, strMess: any) {
        let alert = {
            type: 'error',
            title: strTitle,
            message: strMess
        }
        this.shareData.sendMessage('alert', alert);
    }

    showWarningMessage(strTitle: any, strMess: any) {
        let alert = {
            type: 'warning',
            title: strTitle,
            message: strMess
        }
        this.shareData.sendMessage('alert', alert);
    }

    showInfoMessage(strTitle: any, strMess: any) {
        let alert = {
            type: 'info',
            title: strTitle,
            message: strMess
        }
        this.shareData.sendMessage('alert', alert);
    }

}
