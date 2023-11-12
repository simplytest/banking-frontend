export class Id
{
    public child: number;
    public parent: number;

    constructor(parent: number, child: number)
    {
        this.parent = parent;
        this.child = child;
    }

    public toString()
    {
        const left = this.parent.toString();
        const right = this.child.toString();

        const pad_left = 5 - left.length;
        const pad_right = 5 - right.length;

        return `${pad_left}${left}:${pad_right}${right}`;
    }

    public static parse(id: string)
    {
        const split = id.split(":");
        return new Id(Number.parseInt(split[0]), Number.parseInt(split[1]));
    }
}
