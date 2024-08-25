import {BASE_URLS} from "../config.ts";
import Router from "../helpers/router.ts";
import {IResult} from "../helpers/Http.ts";
import alertController from "../helpers/alert-controller.ts";
import modalController from "../helpers/modal-controller.ts";
import Alert from "../components/alert";
import Block from "../helpers/Block.ts";


export const responseHasError = (response: IResult) => {
    switch (response.status) {
        case 200:
            return false;
        case 500:
            Router.getRouter().go(BASE_URLS['page-500']);
            break;
        default: {
            const error = (response.data as unknown as {reason:string}).reason;
            if (error.includes('Cookie')) {
                // showAlert('Please, login!');
                return error;
            } else {
                if(modalController.opened)showModalAlert(error);
                else showAlert(error);
            }
            //if (error) throw Error(error);
            return error;
        }

    }
}

export const showAlert = (message: string) => {
    alertController.addModal((new Alert({
        message: message || ''
    })) as unknown as Block);
    alertController.openModal();
}

export const showModalAlert = (message: string) => {
    alertController.addModal((new Alert({
        message: message || ''
    })) as unknown as Block);
    alertController.open();
}
