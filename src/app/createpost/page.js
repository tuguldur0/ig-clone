"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabaseClient } from "@/lib/supabase";
import { ImagePlus } from "lucide-react";
import { useState } from "react";

const Home = () => {
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState(null);
    const [publicUrl, setPublicUrl] = useState(null);
    const supabase = supabaseClient();

    const handleFile = async (e) => {
         const selected = e.target.files[0];
        setFile(selected);
        const response = await supabase.storage
            .from("POST_IMAGES")
            .upload(`images/${selected.name}`, selected);

        const {data : publicUrlData} = supabase.storage.from("POST_IMAGES").getPublicUrl(`images/${e.target.files[0].name}`);
        setPublicUrl(publicUrlData.publicUrl);

        console.log(response);
        console.log(publicUrlData);
    };
    const handleCaptionValue = (e) => setCaption(e.target.value);

    console.log(file);
    const handlePost = async () => {
        const results = await supabase.from('posts').insert({
            imageUrl: publicUrl,
            caption: caption
        })
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10">
            <div className="w-full max-w-md rounded-xl border bg-background p-8 shadow-sm">
                <div className="mb-6 space-y-1.5 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create post
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Share a photo with a caption.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-sm font-medium leading-none">Photo</p>
                        <label
                            htmlFor="image"
                            className={`flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed bg-muted/40 text-center transition-colors hover:bg-muted focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background ${publicUrl ? "aspect-[3/4]" : "h-48"}`}
                        >
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={(e) => handleFile(e)}
                            />
                            {publicUrl ? (
                                <img
                                    src={publicUrl}
                                    alt="Preview of the selected photo"
                                    className="h-full w-full object-cover"
                                />
                            ) : file ? (
                                <p className="text-sm text-muted-foreground">Uploading…</p>
                            ) : (
                                <div className="flex flex-col items-center gap-2 px-4">
                                    <ImagePlus className="h-6 w-6 text-muted-foreground" />
                                    <p className="text-sm font-medium">Choose a photo</p>
                                    <p className="text-xs text-muted-foreground">
                                        Click to browse your files
                                    </p>
                                </div>
                            )}
                        </label>
                        {file && (
                            <p className="truncate text-xs text-muted-foreground">
                                {file.name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="caption" className="text-sm font-medium leading-none">
                            Caption
                        </label>
                        <Textarea
                            id="caption"
                            onChange={(e) => handleCaptionValue(e)}
                            placeholder="Write a caption..."
                            max={100}
                            className="min-h-24 resize-none"
                        />
                    </div>

                    <Button onClick={handlePost} className="w-full">
                        Post
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default Home;