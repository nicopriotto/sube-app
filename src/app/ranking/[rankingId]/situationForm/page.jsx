"use client";
import SituationForm from "@/app/components/SituationForm";
import { useParams } from "next/navigation";

export default function RankingSituationPage() {
  const { rankingId } = useParams();
  return (
    <div className="app">
      <SituationForm rankingId={rankingId} />
    </div>
  );
}

