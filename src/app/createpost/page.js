"use client"

import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/lib/supabase";
import { useState } from "react";

const Home = () => {
    const [file, setFile] = useState(null);
    const supabase = supabaseClient();

    const handleFile = async (e) => {
         const selected = e.target.files[0];
        setFile(selected);
        const response = await supabase.storage
            .from("POST_IMAGES")
            .upload(`images/${selected.name}`, selected);

        const {data : publicUrlData} = supabase.storage.from("POST_IMAGES").getPublicUrl(`images/${e.target.files[0].name}`);
        console.log(response);
        console.log(publicUrlData);
    };
    console.log(file);
    return (
        <div>
            Create post
            <Input type="file" onChange={(e) => handleFile(e)}/>
        </div>
    )
}
export default Home;