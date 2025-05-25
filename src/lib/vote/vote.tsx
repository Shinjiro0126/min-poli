import { supabase } from "@/lib/supabase";
import { VVote } from "@/types/vote/vote";

async function getCurrentVotePeriodId(): Promise<number> {
  const today = new Date().toISOString().slice(0, 10);

  const {data, error} = await supabase
  .from("t_vote_periods")
  .select("vote_period_id")
  .lte("start_date", today)
  .gte("end_date", today)
  .single();

  if(error){
    console.error("Vote period lookup error:", error);
    throw error;
  }
  if(!data){
    throw new Error("現在実行中の投票期間が見つかりません。");
  }
  
  return data.vote_period_id;
}

export async function getCurrentPeriodVotes(): Promise<VVote[]> {
  const periodId = await getCurrentVotePeriodId();

  const {data, error} = await supabase
  .from("v_votes")
  .select("*")
    .eq("vote_period_id", periodId)
    .eq("is_public", true)
    .eq("is_deleted", false)
    .order("voted_at", {ascending: false})

    if(error){
      console.error("Suppabase fetch error:", error);
      throw error;
    }

    return data ?? [];
}