import styles from "./page.module.css";
import Post from "../components/post/post"
import SessionForm from "@/components/session-form/session-form";
import { createClient } from '@/utils/supabase/server'
import { act } from "react";

export default async function Home() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div>
      <SessionForm user={user}/>
      <Post />
    </div>

  );
}
