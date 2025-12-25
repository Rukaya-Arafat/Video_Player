import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export function useVideos() {
  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setErr("");

      const { data, error } = await supabase
        .from("Videos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setErr(error.message || "Failed to load videos");
        setVideos([]);
        setSelected(null);
        setLoading(false);
        return;
      }

      setVideos(data || []);
      setSelected((data || [])[0] || null);
      setLoading(false);
    };

    load();
  }, []);

  return { videos, selected, setSelected, loading, err };
}
