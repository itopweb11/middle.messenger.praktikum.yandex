import {IProps,Block} from "../../helpers/Block";

interface ILinkProps extends IProps{
    type: string,
    desc: string,
    linkIcon?:boolean
    linkLine?:boolean
    page?: string,
    href?: string,
}

export class Link extends Block {
    constructor(props: ILinkProps) {super(props);}
    public get props(){return this._props as ILinkProps;}
    protected render(): string {
        const { href='#', desc='', page='' ,linkIcon=false,linkLine=false,type=''} = this.props;
        const classLink=`link ${type?`link-${type}`:''} ${linkLine?'link-line':''}`
        return (`
            <a href= ${href} class="${classLink}"
               ${page?`page=${page}`:''}>
                ${desc}
                ${linkIcon ? '<div class="link-icon"></div>' 
                    : ''
                }
            </a>
        `)
    }
}
