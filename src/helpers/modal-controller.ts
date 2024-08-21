import Block from "./Block.ts";

class ModalController {
    private static __instance: ModalController;
    private dialog: HTMLDialogElement | null=null;
    private _opened: boolean=false;

    constructor() {
        if (ModalController.__instance) {
            return ModalController.__instance;
        }
        ModalController.__instance = this;
        this.dialog= document.getElementById('dialog') as HTMLDialogElement;
        this._opened=false;
    }

    public static getInstance() {
        return this.__instance;
    }

    public get opened(){
        return this._opened;
    }
    public addModal(modal: Block) {
        const htmlElement = modal.getContent();
        if (!this.dialog?.firstElementChild) this.dialog?.append(document.createElement('div'));
        if(htmlElement)this.dialog?.firstElementChild?.replaceWith(htmlElement);
    }

    public openModal(){
        this._opened=true;
        this.dialog?.showModal()
    }

    public closeModal(){
        this._opened=false;
        this.dialog?.close()
    }

}
const modalController=new ModalController();
export default modalController;
