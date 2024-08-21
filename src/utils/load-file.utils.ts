export const loadNewFileFromDrag=<TEvent>(e:TEvent,name:string='avatar'):FormData|null=>{
    let file=null;
    if(e instanceof DragEvent){
        const dt = e.dataTransfer;
        if (dt) {
            file = dt.files[0];
        }
    }
    if(e instanceof Event){
       const files = (e.target as unknown as HTMLInputElement)?.files;
       if(files)file=files[0];
    }
    if(file){
        const formData = new FormData();
        formData.append(name, file);
        return formData;
    }

    return null;
}
export const deleteActive=(e:Event)=>{
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement)?.classList.remove('highlight');
}

export const addActive=(e:Event)=>{
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement)?.classList.add('highlight');
}
