import Prompt from "@models/prompt"
import { connectToDb } from "@utils/database"

//GET
export const GET=async(request,{params})=>{
    try {
        await connectToDb()
        const prompt=await Prompt.findById(params.id).populate("creator")
        if(!prompt) return new Response("prompt not found",{status:404})
        return new Response(JSON.stringify(prompt),{status:200})
    } catch (error) {
        return new Response("failed to fetch prompts",{status:500})
    }
}
//PATCH 
export const PATCH=async(request,{params})=>{
    const {prompt,tag}=await request.json();
    try {
        await connectToDb()
        const existingPrompt=await Prompt.findById(params.id)
        if(!existingPrompt) return new Response("prompt not found",{status:404})
        existingPrompt.prompt=prompt
        existingPrompt.tag=tag
        await existingPrompt.save()
        return new Response(JSON.stringify(existingPrompt),{status:200})
    } catch (error) {
        return new Response("failed to fetch prompts",{status:500})

    }
}

//DELETE
export const DELETE = async (request, { params }) => {
    try {
        await connectToDb();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};