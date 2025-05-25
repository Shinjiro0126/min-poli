import { supabase } from "@/lib/supabase";
import { MParty } from "@/types/party/party";

export async function getAllParties(): Promise<MParty[]>{
  const {data, error} = await supabase
  .from("m_party")
  .select("*")

  if(error){
    console.error("failed to fetch parties:", error);
    throw error;
  }

  return data ?? [];
}