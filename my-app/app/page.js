import styles from "./page.module.css";
import SessionForm from "@/components/session-form/session-form";
import { createClient } from '@/utils/supabase/server'
import SessionList from "@/components/session-list/session-list";

export default async function Home() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div>
      <SessionForm user={user} active={true}/>
      <SessionList user={user}/>
    </div>

  );
}
