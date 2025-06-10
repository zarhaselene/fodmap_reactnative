import { supabase } from "../utils/supabase";

// Create daily tracker entry
export async function createTrackerEntry(userId, entryData) {
  const { data, error } = await supabase
    .from("daily_tracker")
    .insert([
      {
        user_id: userId,
        date: entryData.date,
        mood: entryData.mood,
        symptoms: entryData.symptoms,
        notes: entryData.notes || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  return { data, error };
}

// Update existing tracker entry
export async function updateTrackerEntry(entryId, userId, entryData) {
  const { data, error } = await supabase
    .from("daily_tracker")
    .update({
      mood: entryData.mood,
      symptoms: entryData.symptoms,
      notes: entryData.notes || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", entryId)
    .eq("user_id", userId)
    .select()
    .single();

  return { data, error };
}

// Get tracker entries for a specific user
export async function getTrackerEntries(userId, limit = 30) {
  const { data, error } = await supabase
    .from("daily_tracker")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(limit);

  return { data, error };
}

// Get tracker entry for a specific date
export async function getTrackerEntryByDate(userId, date) {
  const { data, error } = await supabase
    .from("daily_tracker")
    .select("*")
    .eq("user_id", userId)
    .eq("date", date)
    .single();

  return { data, error };
}

// Get tracker statistics/overview
export async function getTrackerOverview(userId, days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from("daily_tracker")
    .select("*")
    .eq("user_id", userId)
    .gte("date", startDate.toISOString().split("T")[0])
    .order("date", { ascending: false });

  if (error) return { data: null, error };

  // Calculate overview statistics
  const overview = {
    totalEntries: data.length,
    averageMood: 0,
    commonSymptoms: {},
    moodTrend: [],
    recentEntries: data.slice(0, 5),
  };

  if (data.length > 0) {
    // Calculate average mood
    const moodValues = {
      "Very Poor": 1,
      Poor: 2,
      Okay: 3,
      Good: 4,
      Excellent: 5,
    };
    const moodSum = data.reduce(
      (sum, entry) => sum + (moodValues[entry.mood] || 0),
      0
    );
    overview.averageMood = (moodSum / data.length).toFixed(1);

    // Count common symptoms
    data.forEach((entry) => {
      if (entry.symptoms && Array.isArray(entry.symptoms)) {
        entry.symptoms.forEach((symptom) => {
          overview.commonSymptoms[symptom] =
            (overview.commonSymptoms[symptom] || 0) + 1;
        });
      }
    });

    // Mood trend (last 7 days)
    overview.moodTrend = data.slice(0, 7).map((entry) => ({
      date: entry.date,
      mood: moodValues[entry.mood] || 0,
    }));
  }

  return { data: overview, error: null };
}

// Delete tracker entry
export async function deleteTrackerEntry(entryId, userId) {
  const { data, error } = await supabase
    .from("daily_tracker")
    .delete()
    .eq("id", entryId)
    .eq("user_id", userId);

  return { data, error };
}
