import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    try {
        const body = await request.json() 
        const client = await clientPromise;
        const db = client.db("bitlinks-cluster")
        const collection = db.collection("url")

        // Check if the short url exists
        const doc = await collection.findOne({shorturl: body.shorturl})
        if(doc){
            return Response.json({success: false, error: true,  message: 'URL already exists!' })
        }

        const result = await collection.insertOne({
            url: body.url,
            shorturl: body.shorturl
        })

        return Response.json({success: true, error: false,  message: 'URL Generated Successfully' })
    } catch (error) {
        console.error("Database Error:", error);
        return Response.json({ success: false, error: true, message: 'Internal Server Error. Check your DB connection.' }, { status: 500 })
    }
}