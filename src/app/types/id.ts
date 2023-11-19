export class Id
{
    public child: number;
    public parent: number;

    constructor(parent: number, child: number)
    {
        this.parent = parent;
        this.child = child;
    }

    public getParent()
    {
        const str = this.parent.toString();
        const pad = 5 - str.length;
        return `${"0".repeat(pad)}${str}`;
    }

    public getChild()
    {
        const str = this.child.toString();
        const pad = 5 - str.length;
        return `${"0".repeat(pad)}${str}`;
    }

    public toString()
    {
        return `${this.getParent()}:${this.getChild()}`;
    }

    public static parse(id: string)
    {
        const split = id.split(":");
        return new Id(Number.parseInt(split[0]), Number.parseInt(split[1]));
    }

    public static from(other: Id)
    {
        return new Id(other.parent, other.child);
    }
}
