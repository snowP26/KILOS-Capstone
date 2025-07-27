export default async function Project({ params } : { params: { id: string } }) {
    const { id } = await params
    return <h1>Product ID: <strong>{id}</strong></h1>;
}