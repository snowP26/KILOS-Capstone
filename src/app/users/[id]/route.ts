import { users } from "../route";

export async function GET(_req: Request, { params } : { params : { id: string}}){
    const { id } = await params;
    const user = users.find((user) => user.id === parseInt(id));

    return Response.json(user);
}

export async function PUT(req: Request, { params } : { params : { id: string}}){
    const { id } = await params;

    const user = users.find((user) => user.id === parseInt(id));

    if(user){
        const updatedData = await req.json();
        Object.assign(user, updatedData);
        return Response.json(user);
    }

}