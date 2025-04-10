import View from "./view";

function createOrderLayout(fields: string[]) : string {
    return(
        `${fields.join('\n')}`
    );
}

export default class OrderContactstView extends View {
    private fields: string[] = null;

    constructor(...fields: string[]) {
        super();
        this.fields = [...fields];
    }

    get layout() : string {
        return createOrderLayout(this.fields);
    }
}