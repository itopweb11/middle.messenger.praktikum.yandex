import EventBus from "./EventBus.ts";

export enum StoreEvents {
    Updated = 'Updated'
}

export class Store<State extends Record<string, unknown>> extends EventBus {
    private state: State = {} as State;

    constructor(initState: State) {
        super();
        this.state = initState;
        this.set(this.state);
    }

    public getState() {
        return this.state;
    }

    public set(nextState: Partial<State>) {
        const prevState = {...this.state};
        this.state = {...this.state, ...nextState};
        this.emit(StoreEvents.Updated, prevState, nextState);
    }
}
