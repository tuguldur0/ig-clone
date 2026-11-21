"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabaseClient } from "@/lib/supabase";
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
        <div>
            Create post
            <Input type="file" onChange={(e) => handleFile(e)}/>
            <Textarea onChange={(e) => handleCaptionValue(e)}placeholder="Description" max={100}/>
            <Button onClick={handlePost}>Post</Button>
        </div>
    )
}
export default Home;