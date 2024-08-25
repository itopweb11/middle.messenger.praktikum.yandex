import {IProps,Block} from "../../helpers/Block";
import Router from "../../helpers/router.ts";


interface ILinkProps extends IProps{
    type: string,
    desc: string,
    linkIcon?:boolean
    linkLine?:boolean
    page?: string,
    href?: string,
    onClick:(event: Event)=>void,
    id?: string,
}

export class Link extends Block {
    constructor(props: ILinkProps) {
        super({
            ...props,
            events: {
                click: (event: Event)=>{
                    if(!this.props.onClick)Router.getRouter().go(props.href||'/');
                    this.props.onClick&& this.props.onClick(event);
                }
            }
        })
    }
    public get props(){return this._props as ILinkProps;}
    protected render(): string {
        const {  desc='', page='' ,linkIcon=false,linkLine=false,type='',id} = this.props;
        const classLink=`link ${type?`link-${type}`:''} ${linkLine?'link-line':''}`
        return (`
            <a 
               class="${classLink}"
               ${page ? `page=${page}` : ''}
               id='${id ? id : ''}'
               >
                ${desc}
                ${linkIcon ? '<div class="link-icon"></div>' : ''}
            </a>
        `)
    }
}
