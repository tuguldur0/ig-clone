"use client"
import { supabaseClient } from "@/lib/supabase"
import { useEffect, useState } from "react"

const Home = () => {
  const [posts, setPosts] = useState([]);
  const supabase = supabaseClient();
  const getPosts = async () => {
    const { data, error } = await supabase.from("posts").select("*, profile(username)");
    if (data) setPosts(data);
    else console.log("Error:", error);
  };
  useEffect(() => {
    getPosts();
  }, [])

  return (
    <div className="min-h-screen bg-muted/40 px-4 py-10">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">Home</h1>
          <p className="text-sm text-muted-foreground">
            The latest posts from everyone.
          </p>
        </div>

        {posts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-xl border bg-background shadow-sm"
          >
            <div className="flex items-center gap-3 p-4">
              {post.profile.profileimage ? (
                <img
                  src={post.profile.profileimage}
                  alt=""
                  className="h-9 w-9 rounded-full border object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium uppercase text-muted-foreground"
                >
                  {post.profile.username?.charAt(0)}
                </div>
              )}
              <span className="text-sm font-medium leading-none">
                {post.profile.username}
              </span>
            </div>

            <img
              src={post.imageUrl}
              alt={post.caption || `Photo by ${post.profile.username}`}
              width={300}
              height={400}
              loading="lazy"
              className="aspect-[3/4] h-auto w-full border-y bg-muted object-cover"
            />

            {post.caption && (
              <p className="whitespace-pre-line break-words p-4 text-sm leading-relaxed">
                <span className="font-medium">{post.profile.username}</span>{" "}
                {post.caption}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
export default Home;